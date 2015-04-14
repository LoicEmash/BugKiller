<?php

namespace BugKiller\DataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="bk.bk_user")
*/
class BkUser
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="bk.bk_user_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="bk_client__id", nullable=true)
	*/
	protected $bkClientId;
	
	/**
	* @ORM\Column(type="string", name="mail", nullable=false)
	*/
	protected $mail;
	
	/**
	* @ORM\Column(type="string", name="password", nullable=false)
	*/
	protected $password;
	
	/**
	* @ORM\Column(type="string", name="name", nullable=false)
	*/
	protected $name;
	
	
	/**
	*  @ORM\ManyToOne(targetEntity="BkClient")
	*  @ORM\JoinColumn(name="bk_client__id", referencedColumnName="id")
	**/
	protected $bkClient;
	
	/**
	*  @ORM\OneToMany(targetEntity="BkStory", mappedBy="bkUser")
	**/
	protected $bkStorys;
	
	/**
	*  @ORM\OneToMany(targetEntity="BkPost", mappedBy="bkUser")
	**/
	protected $bkPosts;
	
	public function __construct() {
	$this->bkStorys = new \Doctrine\Common\Collections\ArrayCollection();
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
	
	public function getBkClientId()
	{
		return $this->bkClientId;
	}
	
	public function setBkClientId($value)
	{
		$this->bkClientId= $value;
	}
	
	public function getMail()
	{
		return $this->mail;
	}
	
	public function setMail($value)
	{
		$this->mail= $value;
	}
	
	public function getPassword()
	{
		return $this->password;
	}
	
	public function setPassword($value)
	{
		$this->password= $value;
	}
	
	public function getName()
	{
		return $this->name;
	}
	
	public function setName($value)
	{
		$this->name= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["bkClientId"] = $this->getBkClientId();
		$json["mail"] = $this->getMail();
		$json["password"] = $this->getPassword();
		$json["name"] = $this->getName();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["bkClientId"]))
		{
			$this->setBkClientId($json["bkClientId"]);
		}
		if (isset($json["mail"]))
		{
			$this->setMail($json["mail"]);
		}
		if (isset($json["password"]))
		{
			$this->setPassword($json["password"]);
		}
		if (isset($json["name"]))
		{
			$this->setName($json["name"]);
		}
		$this->bkClient= $em->find('\BugKiller\DataBundle\Entity\BkClient', $json["bkClientId"]);
	}
	
	public function getBkClient()
	{
		return $this->bkClient;
	}
	public function getBkStorys()
	{
		return $this->bkStorys;
	}
	public function getBkPosts()
	{
		return $this->bkPosts;
	}
}
