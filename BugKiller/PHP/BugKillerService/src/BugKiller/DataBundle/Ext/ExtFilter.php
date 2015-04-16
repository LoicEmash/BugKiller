<?php

namespace BugKiller\DataBundle\Ext;


class ExtFilter {

    private $property;
    private $value;
    private $operator;
    function __construct($property,$value,$operator="=") {
        $this->property = $property;
        $this->value = $value;
        $this->operator = $operator;
    }

}
