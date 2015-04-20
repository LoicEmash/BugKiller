<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appProdUrlMatcher.
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appProdUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $context = $this->context;
        $request = $this->request;

        if (0 === strpos($pathinfo, '/Data')) {
            // bug_killer_data_read
            if (preg_match('#^/Data/(?P<table>[^/]++)$#s', $pathinfo, $matches)) {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_bug_killer_data_read;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_data_read')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\DataController::readAction',));
            }
            not_bug_killer_data_read:

            // bug_killer_data_create
            if (preg_match('#^/Data/(?P<table>[^/]++)$#s', $pathinfo, $matches)) {
                if ($this->context->getMethod() != 'POST') {
                    $allow[] = 'POST';
                    goto not_bug_killer_data_create;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_data_create')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\DataController::createAction',));
            }
            not_bug_killer_data_create:

            // bug_killer_data_update
            if (preg_match('#^/Data/(?P<table>[^/]++)$#s', $pathinfo, $matches)) {
                if ($this->context->getMethod() != 'PUT') {
                    $allow[] = 'PUT';
                    goto not_bug_killer_data_update;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_data_update')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\DataController::updateAction',));
            }
            not_bug_killer_data_update:

            // bug_killer_data_delete
            if (preg_match('#^/Data/(?P<table>[^/]++)$#s', $pathinfo, $matches)) {
                if ($this->context->getMethod() != 'DELETE') {
                    $allow[] = 'DELETE';
                    goto not_bug_killer_data_delete;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_data_delete')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\DataController::deleteAction',));
            }
            not_bug_killer_data_delete:

        }

        if (0 === strpos($pathinfo, '/File')) {
            // bug_killer_file_create
            if (preg_match('#^/File/(?P<table>[^/]++)$#s', $pathinfo, $matches)) {
                if ($this->context->getMethod() != 'POST') {
                    $allow[] = 'POST';
                    goto not_bug_killer_file_create;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_file_create')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\FileController::createAction',));
            }
            not_bug_killer_file_create:

            // bug_killer_file_read
            if (preg_match('#^/File/(?P<table>[^/]++)/(?P<id>[^/]++)$#s', $pathinfo, $matches)) {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_bug_killer_file_read;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_file_read')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\FileController::readAction',));
            }
            not_bug_killer_file_read:

            // bug_killer_file_read_thumb
            if (0 === strpos($pathinfo, '/FileThumb') && preg_match('#^/FileThumb/(?P<table>[^/]++)/(?P<id>[^/]++)/(?P<size>[^/]++)$#s', $pathinfo, $matches)) {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_bug_killer_file_read_thumb;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_file_read_thumb')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\FileController::readThumbAction',));
            }
            not_bug_killer_file_read_thumb:

            // bug_killer_file_zip
            if (0 === strpos($pathinfo, '/FileZip') && preg_match('#^/FileZip/(?P<table>[^/]++)/(?P<idList>[^/]++)/(?P<fileName>[^/]++)$#s', $pathinfo, $matches)) {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_bug_killer_file_zip;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_file_zip')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\FileController::readZipAction',));
            }
            not_bug_killer_file_zip:

        }

        // bug_killer_file_mail
        if (0 === strpos($pathinfo, '/Mail') && preg_match('#^/Mail/(?P<to>[^/]++)$#s', $pathinfo, $matches)) {
            if ($this->context->getMethod() != 'POST') {
                $allow[] = 'POST';
                goto not_bug_killer_file_mail;
            }

            return $this->mergeDefaults(array_replace($matches, array('_route' => 'bug_killer_file_mail')), array (  '_controller' => 'BugKiller\\DataBundle\\Controller\\MailController::sendAction',));
        }
        not_bug_killer_file_mail:

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
