<?php

namespace BugKiller\DataBundle\Tests\Ext;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


class ExtPaginationTest extends WebTestCase {

    /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructBadStart() {
        $pagination = new \BugKiller\DataBundle\Ext\ExtPagination(true, 1);
    }
    
     /**
     * @expectedException InvalidArgumentException
     */
    public function testConstructBadLimit() {        
        $pagination = new \BugKiller\DataBundle\Ext\ExtPagination(1, "h");   
    }
    
    

}
