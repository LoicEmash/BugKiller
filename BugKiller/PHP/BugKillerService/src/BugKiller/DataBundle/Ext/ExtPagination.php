<?php

namespace BugKiller\DataBundle\Ext;
use Doctrine\ORM\Tools\Pagination\Paginator;
/**
 * ExtPagination
 * Definition de la classe ExtPagination utilisée pour parser la pagineation ExtJs
 * @package    DataBundle
 * @subpackage ExtPagination
 * @author     Loïc Lecuyer
 */
class ExtPagination {

    /** @var int Début de la pagination */
    private $start;
    /** @var int Nombre maximal d'enregistrement de la pagination */
    private $limit;

    /**
     * Construit une pagination ExtJs
     * @param int $start Début de la pagination
     * @param int $limit Nombre maximal d'enregistrement de la pagination 
     */
    function __construct($start, $limit) {
        $this->start = $start;
        $this->limit = $limit;
    }
    /**
     * Renvoie les résultat de la pagination ou ceux de la requête si la pgination n'est pas active
     * @param QueryBuilder $queryBuilder Constrcuteur de reqête DQL
     * @return array|Paginator Résultat de la requête
     */
    public function getResult($queryBuilder) {
        if ($this->start !== null && $this->limit !== null) {
            $query = $queryBuilder->getQuery();
            $query->setFirstResult($this->start)->setMaxResults($this->limit);
            $paginator = new Paginator($query, $fetchJoinCollection = true);
            return $paginator;
        } else {
            $query = $queryBuilder->getQuery();
            return $query->getResult();
        }
    }

}