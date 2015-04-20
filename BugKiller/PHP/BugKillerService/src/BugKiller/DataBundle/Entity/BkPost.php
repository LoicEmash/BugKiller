<?php

namespace BugKiller\DataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="bk.bk_post")
*/
class BkPost
{
    /**
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Id
    * @ORM\SequenceGenerator(sequenceName="bk.bk_post_id_seq")
    * @ORM\Column(type="integer", name="id", nullable=false)
    */
    protected $id;
    
    /**
    * @ORM\Column(type="integer", name="bk_user__id", nullable=false)
    */
    protected $bkUserId;
    
    /**
    * @ORM\Column(type="integer", name="bk_story__id", nullable=false)
    */
    protected $bkStoryId;
    
    /**
    * @ORM\Column(type="string", name="content", nullable=false)
    */
    protected $content;
    
    /**
    * @ORM\Column(type="datetime", name="dc", nullable=false)
    */
    protected $dc;
    
    /**
    * @ORM\Column(type="string", name="state", nullable=false)
    */
    protected $state;
    
    
    /**
    *  @ORM\ManyToOne(targetEntity="BkStory")
    *  @ORM\JoinColumn(name="bk_story__id", referencedColumnName="id")
    **/
    protected $bkStory;
    
    /**
    *  @ORM\ManyToOne(targetEntity="BkUser")
    *  @ORM\JoinColumn(name="bk_user__id", referencedColumnName="id")
    **/
    protected $bkUser;
    
    public function __construct() {
    }
    
    public function getId()
    {
        return $this->id;
    }
    
    public function setId($value)
    {
        $this->id= $value;
    }
    
    public function getBkUserId()
    {
        return $this->bkUserId;
    }
    
    public function setBkUserId($value)
    {
        $this->bkUserId= $value;
    }
    
    public function getBkStoryId()
    {
        return $this->bkStoryId;
    }
    
    public function setBkStoryId($value)
    {
        $this->bkStoryId= $value;
    }
    
    public function getContent()
    {
        return $this->content;
    }
    
    public function setContent($value)
    {
        $this->content= $value;
    }
    
    public function getDc()
    {
        return $this->dc;
    }
    
    public function setDc($value)
    {
        $this->dc= $value;
    }
    
    public function getState()
    {
        return $this->state;
    }
    
    public function setState($value)
    {
        $this->state= $value;
    }
    
    public function getJson($em)
    {
        $json = [];
        $json["id"] = $this->getId();
        $json["bkUserId"] = $this->getBkUserId();
        $json["bkStoryId"] = $this->getBkStoryId();
        $json["content"] = $this->getContent();
        if ($this->getDc() !== null && $this->getDc() !== '')
        {$json["dc"] = $this->getDc()->format('d/m/Y H:i:s');}
        else { $json["dc"] = null;}
        $json["state"] = $this->getState();
        return $json;
    }
    
    public function setJson($json,$em)
    {
        if (isset($json["id"]))
        {
            $this->setId($json["id"]);
        }
        if (isset($json["bkUserId"]))
        {
            $this->setBkUserId($json["bkUserId"]);
        }
        if (isset($json["bkStoryId"]))
        {
            $this->setBkStoryId($json["bkStoryId"]);
        }
        if (isset($json["content"]))
        {
            $this->setContent($json["content"]);
        }
        if (isset($json["dc"]))
        {
            if ($json["dc"] !== null && $json["dc"] !== '')
            {$this->setDc(\DateTime::createFromFormat('d/m/Y H:i:s',$json["dc"]));}
            else {$this->setDc(null);}
        }
        if (isset($json["state"]))
        {
            $this->setState($json["state"]);
        }
        $this->bkStory= $em->find('\BugKiller\DataBundle\Entity\BkStory', $json["bkStoryId"]);
        $this->bkUser= $em->find('\BugKiller\DataBundle\Entity\BkUser', $json["bkUserId"]);
    }
    
    public function getBkStory()
    {
        return $this->bkStory;
    }
    public function getBkUser()
    {
        return $this->bkUser;
    }
}
