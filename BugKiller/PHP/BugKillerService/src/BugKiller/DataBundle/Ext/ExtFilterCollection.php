<?php

namespace BugKiller\DataBundle\Ext;

class ExtFilterCollection {
    
    private $filters = [];
    public function addFilter ($filter)
    {
        array_push($this->filters,$filter);        
    }
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

    public static function parseJsonFilter($filterInfo) {       
        if (isset($filterInfo["property"]) && isset($filterInfo["value"])) {
            $property = $filterInfo["property"];
            $value = $filterInfo["value"];
            
            if (isset($filterInfo["operator"])) {
                $operator = $filterInfo["operator"];
                return new ExtFilter($property,$value,$operator);
            } else {
                return new ExtFilter($property,$value);
            }
        }
        else
        {
            throw new \Exception('Filtre invalide');
        }
    }

}
