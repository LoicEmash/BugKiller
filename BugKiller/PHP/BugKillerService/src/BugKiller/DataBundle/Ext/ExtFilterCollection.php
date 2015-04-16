<?php

namespace BugKiller\DataBundle\Ext;
/**
 * ExtFilterCollection
 * Definition de la classe ExtFilterCollection utilisée pour parser des filtres ExtJs
 * @package    DataBundle
 * @subpackage ExtFilterCollection
 * @author     Loïc Lecuyer
 */
class ExtFilterCollection {

    /** @var array Tableau des filtres */
    private $filters = [];
    /**
     * Ajoute un filtre au tableau
     * @param ExtFilter $filter Filtre à ajouté au tableau
     */
    public function addFilter($filter) {
        array_push($this->filters, $filter);
    }
    /**
     * Parse les filtes ExtJs à partir du contenu brut
     * @param string $filterString contenu brut des filtres
     * @return ExtFilterCollection Collection de filtre ExtJs
     */
    public static function parseRequestFilters($filterString) {
        $filters = new ExtFilterCollection();
        $filterArray = json_decode($filterString);
        for ($i = 0; $i < count($filterArray); $i++) {
            $filterInfo = get_object_vars($filterArray[$i]);
            $filter = ExtFilterCollection::parseJsonFilter($filterInfo);
            $filters->addFilter($filter);
        }
        return $filters;
    }
    /**
     * Parse un filte ExtJs à partir d'un tableau JSon
     * @param string $filterInfo tableau JSon
     * @return ExtFilter filtre ExtJs
     */
    public static function parseJsonFilter($filterInfo) {
        if (isset($filterInfo["property"]) && isset($filterInfo["value"])) {
            $property = $filterInfo["property"];
            $value = $filterInfo["value"];

            if (isset($filterInfo["operator"])) {
                $operator = $filterInfo["operator"];
                return new ExtFilter($property, $value, $operator);
            } else {
                return new ExtFilter($property, $value);
            }
        } else {
            throw new \Exception('Filtre invalide');
        }
    }
    /**
     * Applique les filtres de la collection à une requete DQL
     * @param QueryBuilder $queryBuilder constructeur de requête
     * @param string $tableAlias alias de la table principal    
     */
    public function applyFilters($queryBuilder,$tableAlias) {
        $parameters = [];
        $wheres = [];
        for ($i = 0; $i < count($this->filters); $i++) {
            $filter = $this->filters[$i];            
            switch ($filter->getOperator()) {

                case '=':
                    $where = $tableAlias."." . $filter->getProperty() . " = ?" . ($i) . "";
                    $parameters[$i] = $filter->getValue();
                    array_push($wheres, $where);
                    break;
                case 'in':
                    $where = $tableAlias."." . $filter->getProperty() . " IN (?" . ($i) . ")";
                    $parameters[$i] = array_values($filter->getValue());
                    array_push($wheres, $where);
                    break;
                case 'like':
                    $where = $tableAlias."." . $filter->getProperty() . " LIKE ?" . ($i) . "";
                    $parameters[$i] = "%" .$filter->getValue() . "%";
                    array_push($wheres, $where);
                    break;
            }
        }
        if (count($wheres) > 0) {
            $queryBuilder->where(implode(' AND ', $wheres))->setParameters($parameters);
        }
    }

}
