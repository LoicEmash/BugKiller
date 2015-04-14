<?php

namespace BugKiller\DataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="bk.bk_fio")
*/
class BkFio
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="bk.bk_fio_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="bk_story__id", nullable=true)
	*/
	protected $bkStoryId;
	
	/**
	* @ORM\Column(type="string", name="name", nullable=false)
	*/
	protected $name;
	
	/**
	* @ORM\Column(type="string", name="ext", nullable=false)
	*/
	protected $ext;
	
	/**
	* @ORM\Column(type="blob", name="content", nullable=false)
	*/
	protected $content;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="BkStory")
	*  @ORM\JoinColumn(name="bk_story__id", referencedColumnName="id")
	**/
	protected $bkStory;
	
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
	
	public function getBkStoryId()
	{
		return $this->bkStoryId;
	}
	
	public function setBkStoryId($value)
	{
		$this->bkStoryId= $value;
	}
	
	public function getName()
	{
		return $this->name;
	}
	
	public function setName($value)
	{
		$this->name= $value;
	}
	
	public function getExt()
	{
		return $this->ext;
	}
	
	public function setExt($value)
	{
		$this->ext= $value;
	}
	
	public function getContent()
	{
		return $this->content;
	}
	
	public function setContent($value)
	{
		$this->content= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["bkStoryId"] = $this->getBkStoryId();
		$json["name"] = $this->getName();
		$json["ext"] = $this->getExt();
		$json["content"] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'/File/BkFio/'.$this->getId();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["bkStoryId"]))
		{
			$this->setBkStoryId($json["bkStoryId"]);
		}
		if (isset($json["name"]))
		{
			$this->setName($json["name"]);
		}
		if (isset($json["ext"]))
		{
			$this->setExt($json["ext"]);
		}
		if (isset($json["content"]))
		{
		}
		$this->bkStory= $em->find('\BugKiller\DataBundle\Entity\BkStory', $json["bkStoryId"]);
	}
	
	public function getBkStory()
	{
		return $this->bkStory;
	}
}
