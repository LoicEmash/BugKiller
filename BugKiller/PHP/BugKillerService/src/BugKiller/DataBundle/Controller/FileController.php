<?php

namespace BugKiller\DataBundle\Controller;

use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;

/**
 * FileController
 * Definition de la classe FileController utilisée pour accèder et ajouter des fichier
 * Ce controller gère les verbes http GET,POST il peut renvoyer des images, des miniatures ou des fichier zip
 * pour toutes les entités de façon générique.
 *
 * @package    DataBundle
 * @subpackage FileController
 * @author     Loïc Lecuyer
 */
class FileController extends ContainerAware {

    /**
     * Renvoie un fichier zip contenant les fichiers dont les ids sont passée en paramètres
     * @param string $table nom de l'entité dans le repository
     * @param array $idList liste des identifiants des fichier à zipper
     * @param string $fileName nom du fichier en sortie
     * @return File Un fichier zip
     * @todo Gestion d'erreurs
     */
    public function readZipAction($table, $idList, $fileName) {
        $ids = explode("|", $idList);        
        $repository = $this->container->get('doctrine')->getRepository('BugKillerDataBundle:' . $table);
        $queryBuilder = $repository->createQueryBuilder('tblMain');
        $parameters = [];
        $parameters[0] = $ids;
        $queryBuilder->where("tblMain.id IN (?0)")->setParameters($parameters);
        $query = $queryBuilder->getQuery();
        $items = $query->getResult();
        $file = tempnam("tmp", "zip");
        $zip = new \ZipArchive();
        $zip->open($file, \ZipArchive::OVERWRITE);
        foreach ($items as $item) {
            $content = \stream_get_contents($item->getContent());
            $zip->addFromString($item->getName(), $content);
        }
        $zip->close();
        header('Content-Type: application/zip');
        header('Content-Length: ' . filesize($file));
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        readfile($file);
        unlink($file);
    }

    /**
     * Renvoie un fichier  dont l'id est passée en paramètres
     * @param string $table nom de l'entité dans le repository
     * @param int $id identifiant du fichier  
     * @return File Le fichier
     * @todo Gestion d'erreurs
     */
    public function readAction($table, $id) {
      
        $repository = $this->container->get('doctrine')->getRepository('BugKillerDataBundle:' . $table);
        $queryBuilder = $repository->createQueryBuilder('tblMain');
        $parameters = [];
        $parameters[0] = $id;
        $queryBuilder->where("tblMain.id = ?0")->setParameters($parameters);
        $query = $queryBuilder->getQuery();
        $items = $query->getResult();
        if (count($items) === 1) {
            $item = $items[0];
            //var_dump($items);           
            $headers = array(
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="' . $item->getName() . '"',
                'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                'Content-Transfer-Encoding' => 'binary',
                'Expires' => '0',
                'Pragma' => 'public'
            );
            $content = \stream_get_contents($item->getContent());
            return new Response($content, 200, $headers);
        }
    }
    /**
     * Renvoie une miniature d'un fichier dont l'identifiant est passé en paramètres
     * @param string $table nom de l'entité dans le repository
     * @param int $id identifiant du fichier  
     * @param int $size taille de la miniature 
     * @return File Une miniature du fichier si c'est une image un icone coresspondant au type de fichier sinon
     * @todo Gestion d'erreurs
     * @todo Gérer les icone pour les fichiers qui ne sont pas des images
     */
    public function readThumbAction($table, $id, $size) {

        $repository = $this->container->get('doctrine')->getRepository('BugKillerDataBundle:' . $table);
        $queryBuilder = $repository->createQueryBuilder('tblMain');
        $parameters = [];
        $parameters[0] = $id;
        $queryBuilder->where("tblMain.id = ?0")->setParameters($parameters);
        $query = $queryBuilder->getQuery();
        $items = $query->getResult();
        $message = "";
        if (count($items) === 1) {
            $item = $items[0];
            $nameLower = strtolower($item->getName());
            $headers = [];
            if (\BugKiller\DataBundle\Util\StringUtil::endsWith($nameLower, '.png') ||
                    \BugKiller\DataBundle\Util\StringUtil::endsWith($nameLower, '.jpg') ||
                    \BugKiller\DataBundle\Util\StringUtil::endsWith($nameLower, '.jpeg') ||
                    \BugKiller\DataBundle\Util\StringUtil::endsWith($nameLower, '.bmp')) {

                $content = \stream_get_contents($item->getContent());
                $image = imagecreatefromstring($content);
                $thumb = $this->createThumbnail($image, $size, $size);
                ob_start();
                imagepng($thumb);
                $thumbData = ob_get_contents();
                ob_end_clean();
                $headers = array(
                    'Content-Type' => 'image/png',
                    'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                    'Content-Transfer-Encoding' => 'binary',
                    'Expires' => '0',
                    'Pragma' => 'public'
                );
                $message = $thumbData;
                imagedestroy($image);
                imagedestroy($thumb);
            } else {
                //@TODO : Gestion des icones
            }

            return new Response($message, 200, $headers);
        }
    }
     /**
     * Crée un miniature à partir d'une image source
     * @param Image $src_img image source
     * @param int $new_width nouvelle largeur  
     * @param int $new_height nouvelle hauteur
     * @return Image image redimensioné
     * @todo Gérer la conservation des proportions
     */
    private function createThumbnail($src_img, $new_width, $new_height) {

        $old_x = imageSX($src_img);
        $old_y = imageSY($src_img);
        if ($old_x > $old_y) {
            $thumb_w = $new_width;
            $thumb_h = $old_y * ($new_height / $old_x);
        }

        if ($old_x < $old_y) {
            $thumb_w = $old_x * ($new_width / $old_y);
            $thumb_h = $new_height;
        }

        if ($old_x == $old_y) {
            $thumb_w = $new_width;
            $thumb_h = $new_height;
        }

        $dst_img = ImageCreateTrueColor($thumb_w, $thumb_h);
        imagecopyresampled($dst_img, $src_img, 0, 0, 0, 0, $thumb_w, $thumb_h, $old_x, $old_y);
        return $dst_img;
    }
    /**
     * Ajoute un fichier, le fichier est lu à partie de la variable globale PHP $_FILES
     * Le nom du fichier dans le tableau est forcément file
     * @param string $table nom de l'entité dans le repository     
     * @return Response réponse symfony
     * @todo Gestion d'erreurs
     */
    public function createAction($table) {

        $em = $this->container->get('doctrine')->getEntityManager();
        $className = "BugKiller\\DataBundle\\Entity\\" . $table;
        $item = new $className();
        $file = $_FILES["file"];
        $item->setName($file['name']);
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $item->setExt($ext);
        $stream = fopen($file['tmp_name'], 'rb');
        $item->setContent(\stream_get_contents($stream));
        $em->persist($item);
        $em->flush();
        fclose($stream);
        $json['datas'] = [$item->getJson($em)];
        $json['success'] = true;
        $json['total'] = 1;
        $json['message'] = "ok";
        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
