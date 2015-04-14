<?php

namespace BugKiller\DataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="bk.bk_client")
*/
class BkClient
{
	/**
	* @ORM\GeneratedValue(strategy="AUTO")
	* @ORM\Id
	* @ORM\SequenceGenerator(sequenceName="bk.bk_client_id_seq")
	* @ORM\Column(type="integer", name="id", nullable=false)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="string", name="nom", nullable=false)
	*/
	protected $nom;
	
	
	/**
	*  @ORM\OneToMany(targetEntity="BkUser", mappedBy="bkClient")
	**/
	protected $bkUsers;
	
	public function __construct() {
	$this->bkUsers = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id= $value;
	}
	
	public function getNom()
	{
		return $this->nom;
	}
	
	public function setNom($value)
	{
		$this->nom= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["nom"] = $this->getNom();
		return $json;
	}
	
	public function setJson($json,$em)
	{
		if (isset($json["id"]))
		{
			$this->setId($json["id"]);
		}
		if (isset($json["nom"]))
		{
			$this->setNom($json["nom"]);
		}
	}
	
	public function getBkUsers()
	{
		return $this->bkUsers;
	}
}
