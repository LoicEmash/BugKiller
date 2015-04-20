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
    * @ORM\Column(type="integer", name="rep_del", nullable=false)
    */
    protected $repDel;
    
    /**
    * @ORM\Column(type="integer", name="exe_del", nullable=false)
    */
    protected $exeDel;
    
    
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
    
    public function getRepDel()
    {
        return $this->repDel;
    }
    
    public function setRepDel($value)
    {
        $this->repDel= $value;
    }
    
    public function getExeDel()
    {
        return $this->exeDel;
    }
    
    public function setExeDel($value)
    {
        $this->exeDel= $value;
    }
    
    public function getJson($em)
    {
        $json = [];
        $json["id"] = $this->getId();
        $json["nom"] = $this->getNom();
        $json["repDel"] = $this->getRepDel();
        $json["exeDel"] = $this->getExeDel();
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
        if (isset($json["repDel"]))
        {
            $this->setRepDel($json["repDel"]);
        }
        if (isset($json["exeDel"]))
        {
            $this->setExeDel($json["exeDel"]);
        }
    }
    
    public function getBkUsers()
    {
        return $this->bkUsers;
    }
}
