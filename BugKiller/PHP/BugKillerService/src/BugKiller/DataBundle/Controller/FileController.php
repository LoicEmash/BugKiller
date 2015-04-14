<?php

namespace BugKiller\DataBundle\Controller;

use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;
use \BugKiller\DataBundle\Util;

class FileController extends ContainerAware {

    public function readZipAction($table, $idList,$fileName) {
        $ids = explode("|", $idList);
        $em = $this->container->get('doctrine')->getEntityManager();
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
        header('Content-Disposition: attachment; filename="'.$fileName.'"');
        readfile($file);
        unlink($file);
    }

    public function readAction($table, $id) {
        $em = $this->container->get('doctrine')->getEntityManager();
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
