<?php

namespace Proxies\__CG__\BugKiller\DataBundle\Entity;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class BkVStory extends \BugKiller\DataBundle\Entity\BkVStory implements \Doctrine\ORM\Proxy\Proxy
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
            return array('__isInitialized__', 'id', 'bkUserId', 'bkStoryProd', 'bkStoryApp', 'bkStorySev', 'bkStoryPrio', 'bkStoryRepro', 'bkStoryDc', 'bkStoryTitle', 'bkPostState', 'bkPostDc', 'bkPostCount', 'bkFioCount', 'bkUserName', 'bkClientName', 'resolveDelay', 'replyDelay');
        }

        return array('__isInitialized__', 'id', 'bkUserId', 'bkStoryProd', 'bkStoryApp', 'bkStorySev', 'bkStoryPrio', 'bkStoryRepro', 'bkStoryDc', 'bkStoryTitle', 'bkPostState', 'bkPostDc', 'bkPostCount', 'bkFioCount', 'bkUserName', 'bkClientName', 'resolveDelay', 'replyDelay');
    }

    /**
     * 
     */
    public function __wakeup()
    {
        if ( ! $this->__isInitialized__) {
            $this->__initializer__ = function (BkVStory $proxy) {
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
    public function getBkStoryProd()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStoryProd', array());

        return parent::getBkStoryProd();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStoryProd($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStoryProd', array($value));

        return parent::setBkStoryProd($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkStoryApp()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStoryApp', array());

        return parent::getBkStoryApp();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStoryApp($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStoryApp', array($value));

        return parent::setBkStoryApp($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkStorySev()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStorySev', array());

        return parent::getBkStorySev();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStorySev($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStorySev', array($value));

        return parent::setBkStorySev($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkStoryPrio()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStoryPrio', array());

        return parent::getBkStoryPrio();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStoryPrio($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStoryPrio', array($value));

        return parent::setBkStoryPrio($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkStoryRepro()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStoryRepro', array());

        return parent::getBkStoryRepro();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStoryRepro($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStoryRepro', array($value));

        return parent::setBkStoryRepro($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkStoryDc()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStoryDc', array());

        return parent::getBkStoryDc();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStoryDc($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStoryDc', array($value));

        return parent::setBkStoryDc($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkStoryTitle()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkStoryTitle', array());

        return parent::getBkStoryTitle();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkStoryTitle($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkStoryTitle', array($value));

        return parent::setBkStoryTitle($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkPostState()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkPostState', array());

        return parent::getBkPostState();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkPostState($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkPostState', array($value));

        return parent::setBkPostState($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkPostDc()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkPostDc', array());

        return parent::getBkPostDc();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkPostDc($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkPostDc', array($value));

        return parent::setBkPostDc($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkPostCount()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkPostCount', array());

        return parent::getBkPostCount();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkPostCount($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkPostCount', array($value));

        return parent::setBkPostCount($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkFioCount()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkFioCount', array());

        return parent::getBkFioCount();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkFioCount($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkFioCount', array($value));

        return parent::setBkFioCount($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkUserName()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkUserName', array());

        return parent::getBkUserName();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkUserName($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkUserName', array($value));

        return parent::setBkUserName($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getBkClientName()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getBkClientName', array());

        return parent::getBkClientName();
    }

    /**
     * {@inheritDoc}
     */
    public function setBkClientName($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setBkClientName', array($value));

        return parent::setBkClientName($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getResolveDelay()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getResolveDelay', array());

        return parent::getResolveDelay();
    }

    /**
     * {@inheritDoc}
     */
    public function setResolveDelay($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setResolveDelay', array($value));

        return parent::setResolveDelay($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getReplyDelay()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getReplyDelay', array());

        return parent::getReplyDelay();
    }

    /**
     * {@inheritDoc}
     */
    public function setReplyDelay($value)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setReplyDelay', array($value));

        return parent::setReplyDelay($value);
    }

    /**
     * {@inheritDoc}
     */
    public function getJson($em)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getJson', array($em));

        return parent::getJson($em);
    }

}
