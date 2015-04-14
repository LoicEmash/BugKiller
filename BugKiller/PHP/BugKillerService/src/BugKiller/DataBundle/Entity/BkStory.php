<?php

namespace BugKiller\DataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="bk.bk_story")
*/
class BkStory
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="bk.bk_story_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="bk_user__id", nullable=false)
	*/
	protected $bkUserId;
	
	/**
	* @ORM\Column(type="string", name="prod", nullable=false)
	*/
	protected $prod;
	
	/**
	* @ORM\Column(type="string", name="app", nullable=false)
	*/
	protected $app;
	
	/**
	* @ORM\Column(type="string", name="sev", nullable=false)
	*/
	protected $sev;
	
	/**
	* @ORM\Column(type="string", name="prio", nullable=false)
	*/
	protected $prio;
	
	/**
	* @ORM\Column(type="string", name="repro", nullable=false)
	*/
	protected $repro;
	
	/**
	* @ORM\Column(type="datetime", name="dc", nullable=false)
	*/
	protected $dc;
	
	/**
	* @ORM\Column(type="string", name="title", nullable=false)
	*/
	protected $title;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="BkUser")
	*  @ORM\JoinColumn(name="bk_user__id", referencedColumnName="id")
	**/
	protected $bkUser;
	
	/**
	*  @ORM\OneToMany(targetEntity="BkFio", mappedBy="bkStory")
	**/
	protected $bkFios;
	
	/**
	*  @ORM\OneToMany(targetEntity="BkPost", mappedBy="bkStory")
	**/
	protected $bkPosts;
	
	public function __construct() {
	$this->bkFios = new \Doctrine\Common\Collections\ArrayCollection();
	$this->bkPosts = new \Doctrine\Common\Collections\ArrayCollection();
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
	
	public function getProd()
	{
		return $this->prod;
	}
	
	public function setProd($value)
	{
		$this->prod= $value;
	}
	
	public function getApp()
	{
		return $this->app;
	}
	
	public function setApp($value)
	{
		$this->app= $value;
	}
	
	public function getSev()
	{
		return $this->sev;
	}
	
	public function setSev($value)
	{
		$this->sev= $value;
	}
	
	public function getPrio()
	{
		return $this->prio;
	}
	
	public function setPrio($value)
	{
		$this->prio= $value;
	}
	
	public function getRepro()
	{
		return $this->repro;
	}
	
	public function setRepro($value)
	{
		$this->repro= $value;
	}
	
	public function getDc()
	{
		return $this->dc;
	}
	
	public function setDc($value)
	{
		$this->dc= $value;
	}
	
	public function getTitle()
	{
		return $this->title;
	}
	
	public function setTitle($value)
	{
		$this->title= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["bkUserId"] = $this->getBkUserId();
		$json["prod"] = $this->getProd();
		$json["app"] = $this->getApp();
		$json["sev"] = $this->getSev();
		$json["prio"] = $this->getPrio();
		$json["repro"] = $this->getRepro();
		if ($this->getDc() !== null && $this->getDc() !== '')
		{$json["dc"] = $this->getDc()->format('d/m/Y H:i:s');}
		else { $json["dc"] = null;}
		$json["title"] = $this->getTitle();
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
		if (isset($json["prod"]))
		{
			$this->setProd($json["prod"]);
		}
		if (isset($json["app"]))
		{
			$this->setApp($json["app"]);
		}
		if (isset($json["sev"]))
		{
			$this->setSev($json["sev"]);
		}
		if (isset($json["prio"]))
		{
			$this->setPrio($json["prio"]);
		}
		if (isset($json["repro"]))
		{
			$this->setRepro($json["repro"]);
		}
		if (isset($json["dc"]))
		{
			if ($json["dc"] !== null && $json["dc"] !== '')
			{$this->setDc(\DateTime::createFromFormat('d/m/Y H:i:s',$json["dc"]));}
			else {$this->setDc(null);}
		}
		if (isset($json["title"]))
		{
			$this->setTitle($json["title"]);
		}
		$this->bkUser= $em->find('\BugKiller\DataBundle\Entity\BkUser', $json["bkUserId"]);
	}
	
	public function getBkUser()
	{
		return $this->bkUser;
	}
	public function getBkFios()
	{
		return $this->bkFios;
	}
	public function getBkPosts()
	{
		return $this->bkPosts;
	}
}
