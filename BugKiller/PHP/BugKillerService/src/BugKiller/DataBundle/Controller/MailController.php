<?php

namespace BugKiller\DataBundle\Controller;

use BugKiller\DataBundle\Util;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Tools\Pagination\Paginator;

class MailController extends ContainerAware {

    public function sendAction($to) {
        $request = $this->container->get('request');
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
