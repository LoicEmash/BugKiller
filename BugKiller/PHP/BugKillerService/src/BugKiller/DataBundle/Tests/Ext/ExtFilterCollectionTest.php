<?php

namespace BugKiller\DataBundle\Tests\Ext;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use BugKiller\DataBundle\Ext;

class ExtFilterCollectionTest extends WebTestCase {

    /**
     * @expectedException InvalidArgumentException
     */
    public function testParseRequestFiltersNull() {
        \BugKiller\DataBundle\Ext\ExtFilterCollection::parseRequestFilters(null);
    }
    /**
     * @expectedException InvalidArgumentException
     */
    public function testParseRequestFiltersBadString() {
        \BugKiller\DataBundle\Ext\ExtFilterCollection::parseRequestFilters("4f4dsfd");
    }
    /**
     * @expectedException InvalidArgumentException
     */
    public function testParseRequestFiltersBadJson() {
        \BugKiller\DataBundle\Ext\ExtFilterCollection::parseRequestFilters("{ gogo:4 }");
    }
    /**
     * @expectedException InvalidArgumentException
     */
    public function testParseRequestFiltersBadJsonArray() {
        \BugKiller\DataBundle\Ext\ExtFilterCollection::parseRequestFilters("[{ property:\"id\",value:4 },{}]");
    }
}
