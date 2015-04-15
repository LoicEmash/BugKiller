<?php

namespace BugKiller\DataBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity
* @ORM\Table(name="bk.bk_v_story")
*/
class BkVStory
{
	/**
	* @ORM\GeneratedValue(strategy="NONE")
	* @ORM\Id
	* @ORM\Column(type="integer", name="id", nullable=true)
	*/
	protected $id;
	
	/**
	* @ORM\Column(type="integer", name="bk_user__id", nullable=true)
	*/
	protected $bkUserId;
	
	/**
	* @ORM\Column(type="string", name="bk_story__prod", nullable=true)
	*/
	protected $bkStoryProd;
	
	/**
	* @ORM\Column(type="string", name="bk_story__app", nullable=true)
	*/
	protected $bkStoryApp;
	
	/**
	* @ORM\Column(type="string", name="bk_story__sev", nullable=true)
	*/
	protected $bkStorySev;
	
	/**
	* @ORM\Column(type="string", name="bk_story__prio", nullable=true)
	*/
	protected $bkStoryPrio;
	
	/**
	* @ORM\Column(type="string", name="bk_story__repro", nullable=true)
	*/
	protected $bkStoryRepro;
	
	/**
	* @ORM\Column(type="datetime", name="bk_story__dc", nullable=true)
	*/
	protected $bkStoryDc;
	
	/**
	* @ORM\Column(type="string", name="bk_story__title", nullable=true)
	*/
	protected $bkStoryTitle;
	
	/**
	* @ORM\Column(type="string", name="bk_post__state", nullable=true)
	*/
	protected $bkPostState;
	
	/**
	* @ORM\Column(type="datetime", name="bk_post__dc", nullable=true)
	*/
	protected $bkPostDc;
	
	/**
	* @ORM\Column(type="integer", name="bk_post__count", nullable=true)
	*/
	protected $bkPostCount;
	
	/**
	* @ORM\Column(type="integer", name="bk_fio__count", nullable=true)
	*/
	protected $bkFioCount;
	
	/**
	* @ORM\Column(type="string", name="bk_user__name", nullable=true)
	*/
	protected $bkUserName;
	
	/**
	* @ORM\Column(type="string", name="bk_client__name", nullable=true)
	*/
	protected $bkClientName;
	
	/**
	* @ORM\Column(type="integer", name="resolve_delay", nullable=true)
	*/
	protected $resolveDelay;
	
	/**
	* @ORM\Column(type="integer", name="reply_delay", nullable=true)
	*/
	protected $replyDelay;
	
	
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
	
	public function getBkStoryProd()
	{
		return $this->bkStoryProd;
	}
	
	public function setBkStoryProd($value)
	{
		$this->bkStoryProd= $value;
	}
	
	public function getBkStoryApp()
	{
		return $this->bkStoryApp;
	}
	
	public function setBkStoryApp($value)
	{
		$this->bkStoryApp= $value;
	}
	
	public function getBkStorySev()
	{
		return $this->bkStorySev;
	}
	
	public function setBkStorySev($value)
	{
		$this->bkStorySev= $value;
	}
	
	public function getBkStoryPrio()
	{
		return $this->bkStoryPrio;
	}
	
	public function setBkStoryPrio($value)
	{
		$this->bkStoryPrio= $value;
	}
	
	public function getBkStoryRepro()
	{
		return $this->bkStoryRepro;
	}
	
	public function setBkStoryRepro($value)
	{
		$this->bkStoryRepro= $value;
	}
	
	public function getBkStoryDc()
	{
		return $this->bkStoryDc;
	}
	
	public function setBkStoryDc($value)
	{
		$this->bkStoryDc= $value;
	}
	
	public function getBkStoryTitle()
	{
		return $this->bkStoryTitle;
	}
	
	public function setBkStoryTitle($value)
	{
		$this->bkStoryTitle= $value;
	}
	
	public function getBkPostState()
	{
		return $this->bkPostState;
	}
	
	public function setBkPostState($value)
	{
		$this->bkPostState= $value;
	}
	
	public function getBkPostDc()
	{
		return $this->bkPostDc;
	}
	
	public function setBkPostDc($value)
	{
		$this->bkPostDc= $value;
	}
	
	public function getBkPostCount()
	{
		return $this->bkPostCount;
	}
	
	public function setBkPostCount($value)
	{
		$this->bkPostCount= $value;
	}
	
	public function getBkFioCount()
	{
		return $this->bkFioCount;
	}
	
	public function setBkFioCount($value)
	{
		$this->bkFioCount= $value;
	}
	
	public function getBkUserName()
	{
		return $this->bkUserName;
	}
	
	public function setBkUserName($value)
	{
		$this->bkUserName= $value;
	}
	
	public function getBkClientName()
	{
		return $this->bkClientName;
	}
	
	public function setBkClientName($value)
	{
		$this->bkClientName= $value;
	}
	
	public function getResolveDelay()
	{
		return $this->resolveDelay;
	}
	
	public function setResolveDelay($value)
	{
		$this->resolveDelay= $value;
	}
	
	public function getReplyDelay()
	{
		return $this->replyDelay;
	}
	
	public function setReplyDelay($value)
	{
		$this->replyDelay= $value;
	}
	
	public function getJson($em)
	{
		$json = [];
		$json["id"] = $this->getId();
		$json["bkUserId"] = $this->getBkUserId();
		$json["bkStoryProd"] = $this->getBkStoryProd();
		$json["bkStoryApp"] = $this->getBkStoryApp();
		$json["bkStorySev"] = $this->getBkStorySev();
		$json["bkStoryPrio"] = $this->getBkStoryPrio();
		$json["bkStoryRepro"] = $this->getBkStoryRepro();
		if ($this->getBkStoryDc() !== null && $this->getBkStoryDc() !== '')
		{$json["bkStoryDc"] = $this->getBkStoryDc()->format('d/m/Y H:i:s');}
		else { $json["bkStoryDc"] = null;}
		$json["bkStoryTitle"] = $this->getBkStoryTitle();
		$json["bkPostState"] = $this->getBkPostState();
		if ($this->getBkPostDc() !== null && $this->getBkPostDc() !== '')
		{$json["bkPostDc"] = $this->getBkPostDc()->format('d/m/Y H:i:s');}
		else { $json["bkPostDc"] = null;}
		$json["bkPostCount"] = $this->getBkPostCount();
		$json["bkFioCount"] = $this->getBkFioCount();
		$json["bkUserName"] = $this->getBkUserName();
		$json["bkClientName"] = $this->getBkClientName();
		$json["resolveDelay"] = $this->getResolveDelay();
		$json["replyDelay"] = $this->getReplyDelay();
		return $json;
	}
	
}
