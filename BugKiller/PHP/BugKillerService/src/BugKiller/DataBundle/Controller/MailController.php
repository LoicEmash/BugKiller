<?php

namespace BugKiller\DataBundle\Controller;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;

/**
 * MailController
 * Definition de la classe MailController utilisée pour envoyer des mail
 * Ce controller gère le http POST
 *
 * @package    DataBundle
 * @subpackage MailController
 * @author     Loïc Lecuyer
 */
class MailController extends ContainerAware {

    /**
     * Envoie un mail à $to avec comme sujet la variable subject et comme message la variable message
     * @param string $to mail de destination
     * @return Response code 200 si ok code 500 sinon
     */
    public function sendAction($to) {        
        $subject = $_POST['subject']; 
        $message = $_POST['message'];
        $email = 'support@emash.fr';
        $headers = 'From: ' . $email . "\r\n" .
                'Reply-To: ' . $email . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
        $headers .= 'MIME-Version: 1.0' ."\r\n";
        $headers .= 'Content-Type: text/HTML; charset=utf-8' . "\r\n";
        $headers .= 'Content-Transfer-Encoding: 8bit'. "\n\r\n";
        if (mail($to, $subject, $message,$headers)) {
            return new Response("Mail envoyé ".$subject." , ".$message, 200);
        } else {
            return new Response("Erreur de configuration du serveur de mail", 500);
        }
    }

}
