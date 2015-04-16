<?php

namespace BugKiller\DataBundle\Tests\Ext;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


class ExtFilterTest extends WebTestCase {

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructBadProperty() {
        $filter = new \BugKiller\DataBundle\Ext\ExtFilter(0, "",">");
    }
    
     /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructBadOperator() {        
        $filter = new \BugKiller\DataBundle\Ext\ExtFilter("", "",null);   
    }
    
    public function testGetter() {
        $filter = new \BugKiller\DataBundle\Ext\ExtFilter("Id", 4,">");
        $this->assertEquals($filter->getProperty(), "Id");
        $this->assertEquals($filter->getValue(), 4);
        $this->assertEquals($filter->getOperator(), ">");
    }

}
