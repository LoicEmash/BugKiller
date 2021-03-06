<?php

namespace Proxies\__CG__\BugKiller\DataBundle\Entity;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class BkStory extends \BugKiller\DataBundle\Entity\BkStory implements \Doctrine\ORM\Proxy\Proxy
{
    /**
     * @var \Closure the callback responsible for loading properties in the proxy object. This callback is called with
     *      three parameters, being respectively the proxy object to be initialized, the method that triggered the
     *      initialization process and an array of ordered parameters that were passed to that method.
     *
     * @see \Doctrine\Common\Persistence\Proxy::__setInitializer
     */
    public $__initializer__;

    /**
     * @var \Closure the callback responsible of loading properties that need to be copied in the cloned object
     *
     * @see \Doctrine\Common\Persistence\Proxy::__setCloner
     */
    public $__cloner__;

    /**
     * @var boolean flag indicating if this object was already initialized
     *
     * @see \Doctrine\Common\Persistence\Proxy::__isInitialized
     */
    public $__isInitialized__ = false;

    /**
     * @var array properties to be lazy loaded, with keys being the property
     *            names and values being their default values
     *
     * @see \Doctrine\Common\Persistence\Proxy::__getLazyProperties
     */
    public static $lazyPropertiesDefaults = array();



    /**
     * @param \Closure $initializer
     * @param \Closure $cloner
     */
    public function __construct($initializer = null, $cloner = null)
    {

        $this->__initializer__ = $initializer;
        $this->__cloner__      = $cloner;
    }







    /**
     * 
     * @return array
     */
    public function __sleep()
    {
        if ($this->__isInitialized__) {
            return array('__isInitialized__', 'id', 'bkUserId', 'prod', 'app', 'sev', 'prio', 'repro', 'dc', 'title', 'bkUser', 'bkFios', 'bkPosts');
        }

        return array('__isInitialized__', 'id', 'bkUserId', 'prod', 'app', 'sev', 'prio', 'repro', 'dc', 'title', 'bkUser', 'bkFios', 'bkPosts');
    }

    /**
     * 
     */
    public function __wakeup()
    {
        if ( ! $this->__isInitialized__) {
            $this->__initializer__ = function (BkStory $proxy) {
                $proxy->__setInitializer(null);
                $proxy->__setCloner(null);

                $existingProperties = get_object_vars($proxy);

                foreach ($proxy->__getLazyProperties() as $property => $defaultValue) {
                    if ( ! array_key_exists($property, $existingProperties)) {
                        $proxy->$property = $defaultValue;
                    }
                }
            };

        }
    }

    /**
     * 
     */
    public function __clone()
    {
        $this->__cloner__ && $this->__cloner__->__invoke($this, '__clone', array());
    }

    /**
     * Forces initialization of the proxy
     */
    public function __load()
    {
        $this->__initializer__ && $this->__initializer__->__invoke($this, '__load', array());
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __isInitialized()
    {
        return $this->__isInitialized__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitialized($initialized)
    {
        $this->__isInitialized__ = $initialized;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitializer(\Closure $initializer = null)
    {
        $this->__initializer__ = $initializer;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __getInitializer()
    {
        return $this->__initializer__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setCloner(\Closure $cloner = null)
    {
        $this->__cloner__ = $cloner;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific cloning logic
     */
    public function __getCloner()
    {
        return $this->__cloner__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     * @static
     */
    public function __getLazyProperties()
    {
        return self::$lazyPropertiesDefaults;
    }

    
    /**
     * {@inheritDoc}
     */
    public function getId()
    {
        if ($this->__isInitialized__ === false) {
            return (int)  parent::getId();
        }


        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getId', array());

        return parent::getId();
    }

    /**
     * {@inheritDoc}
     */
    public function setId($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setId', array($value));

        return parent::setId($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkUserId()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkUserId', array());

        return parent::getBkUserId();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkUserId($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkUserId', array($value));

        return parent::setBkUserId($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getProd()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getProd', array());

        return parent::getProd();
    }

    /**
     * {@inheritDoc}
     */
    public function setProd($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setProd', array($value));

        return parent::setProd($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getApp()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getApp', array());

        return parent::getApp();
    }

    /**
     * {@inheritDoc}
     */
    public function setApp($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setApp', array($value));

        return parent::setApp($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getSev()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getSev', array());

        return parent::getSev();
    }

    /**
     * {@inheritDoc}
     */
    public function setSev($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setSev', array($value));

        return parent::setSev($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getPrio()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getPrio', array());

        return parent::getPrio();
    }

    /**
     * {@inheritDoc}
     */
    public function setPrio($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setPrio', array($value));

        return parent::setPrio($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getRepro()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getRepro', array());

        return parent::getRepro();
    }

    /**
     * {@inheritDoc}
     */
    public function setRepro($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setRepro', array($value));

        return parent::setRepro($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getDc()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getDc', array());

        return parent::getDc();
    }

    /**
     * {@inheritDoc}
     */
    public function setDc($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setDc', array($value));

        return parent::setDc($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getTitle()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getTitle', array());

        return parent::getTitle();
    }

    /**
     * {@inheritDoc}
     */
    public function setTitle($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setTitle', array($value));

        return parent::setTitle($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getJson($em)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getJson', array($em));

        return parent::getJson($em);
    }

    /**
     * {@inheritDoc}
     */
    public function setJson($json, $em)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setJson', array($json, $em));

        return parent::setJson($json, $em);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkUser()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkUser', array());

        return parent::getBkUser();
    }

    /**
     * {@inheritDoc}
     */
    public function getBkFios()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkFios', array());

        return parent::getBkFios();
    }

    /**
     * {@inheritDoc}
     */
    public function getBkPosts()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkPosts', array());

        return parent::getBkPosts();
    }

}
