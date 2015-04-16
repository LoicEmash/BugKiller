<?php

namespace BugKiller\DataBundle\Ext;
/**
 * ExtSorterCollection
 * Definition de la classe ExtSorterCollection utilisée pour parser des trie ExtJs
 * @package    DataBundle
 * @subpackage ExtSorterCollection
 * @author     Loïc Lecuyer
 */
class ExtSorterCollection {

    /** @var array Tableau des tries */
    private $sorters = [];
    /**
     * Ajoute un trie au tableau
     * @param ExtSorterr $sorter Trie à ajouté au tableau
     */
    public function addSorter($sorter) {
        array_push($this->sorters, $sorter);
    }
    /**
     * Parse les tries ExtJs à partir du contenu brut
     * @param string $sorterString contenu brut des tries
     * @return ExtSorterCollection Collection de trie ExtJs
     */
    public static function parseRequestSorters($sorterString) {
        $sorters = new ExtSorterCollection();
        $sorterArray = json_decode($sorterString);
        for ($i = 0; $i < count($sorterArray); $i++) {
            $sorterInfo = get_object_vars($sorterArray[$i]);
            $sorter = ExtSorterCollection::parseJsonSorter($sorterInfo);
            $sorters->addSorter($sorter);
        }
        return $sorters;
    }
    /**
     * Parse un trie ExtJs à partir d'un tableau JSon
     * @param string $filterInfo tableau JSon
     * @return ExtSorter Trie ExtJs
     */
    public static function parseJsonSorter($filterInfo) {
        if (isset($filterInfo["property"]) && isset($filterInfo["direction"])) {
            $property = $filterInfo["property"];
            $direction = $filterInfo["direction"];
            return new ExtSorter($property, $direction);
        } else {
            throw new \Exception('Trie invalide');
        }
    }
    /**
     * Applique les trie de la collection à une requete DQL
     * @param QueryBuilder $queryBuilder constructeur de requête
     * @param string $tableAlias alias de la table principal    
     */
    public function applySorters($queryBuilder,$tableAlias) {
        if (count($this->sorters) > 0) {
            for ($i = 0; $i < count($this->sorters); $i++) {
                
                $sorter = $this->sorters[$i];
                $queryBuilder->orderBy($tableAlias .".". $sorter->getProperty(), $sorter->getDirection());
            }
        }
    }

}
