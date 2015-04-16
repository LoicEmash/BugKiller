<?php

namespace BugKiller\DataBundle\Controller;
use BugKiller\DataBundle\Util;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Tools\Pagination\Paginator;
use BugKiller\DataBundle\Ext;
class DataController extends ContainerAware {

    public function getRequestJson($requestContent)
    {
        $data = json_decode($requestContent);
        $jsonData = get_object_vars($data);
        return $jsonData;
    }
    
    public function extractId($jsonData)
    {
        if (isset($jsonData["id"]))
        {
            return $jsonData["id"];
        }
        else
        {
            return null;
        }
    }
   

    public function createJsonResponse($datas,$success,$total,$message)
    {
        $json = [];
        $json['datas'] = $datas;
        $json['success'] = $success;
        $json['total'] = $total;
        $json['message'] = $message;
        return $json;
    }
    
    public function updateAction($table) {

        $request = $this->container->get('request');
        $em = $this->container->get('doctrine')->getEntityManager();        
        $content = $request->getContent();
        $datas =$this->getRequestJson($content);
        $id = $this->extractId($datas); 
        $repository = $this->container->get('doctrine')->getRepository('BugKillerDataBundle:' . $table);
        $queryBuilder = $repository->createQueryBuilder('tblMain');
        $queryBuilder->where("tblMain.id = ?0")->setParameters([$id]);
        $query = $queryBuilder->getQuery();
        $items = $query->getResult();
        $item = $items[0];
        $item->setJson($datas,$em);
        $em->persist($item);
        $em->flush();
        $json = $this->createJsonResponse([$item->getJson($em)],true,1,"ok");       
        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    
    public function deleteAction($table) {

        $request = $this->container->get('request');
        $content = $request->getContent();
        $datas =$this->getRequestJson($content);
        $id = $this->extractId($datas); 
        $em = $this->container->get('doctrine')->getEntityManager();
        $repository = $this->container->get('doctrine')->getRepository('BugKillerDataBundle:' . $table);
        $queryBuilder = $repository->createQueryBuilder('tblMain');
        $queryBuilder->where("tblMain.id = ?0")->setParameters([$id]);
        $query = $queryBuilder->getQuery();
        $items = $query->getResult();
        $item = $items[0];       
        $em->remove($item);
        $em->flush();
        $json = $this->createJsonResponse([],true,0,"ok");  
        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function createAction($table) {

        $em = $this->container->get('doctrine')->getEntityManager();
        $request = $this->container->get('request');
        $content = $request->getContent();
        $datas =$this->getRequestJson($content);      
        if (isset($datas["id"])) {
            unset($datas["id"]);
        }
        $className = "BugKiller\\DataBundle\\Entity\\" . $table;
        $item = new $className();
        $item->setJson($datas,$em);        
        $em->persist($item);
        $em->flush();
        $json = $this->createJsonResponse([$item->getJson($em)],true,1,"ok");         
        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function readAction($table) {
        $request = $this->container->get('request');
        $filterParameter = $request->query->get('filter');
        $filterCollection =  \BugKiller\DataBundle\Ext\ExtFilterCollection::parseRequestFilters($filterParameter);
        $idParameter = $request->query->get('id');
        $sorterParameter = $request->query->get('sort');
        $pageParameter = $request->query->get('page');
        $startParameter = $request->query->get('start');
        $limitParameter = $request->query->get('limit');
        
       
        
        $needestParentTable = $request->query->get('needestParentTables');
        $needestParentTables = [];
        if ($needestParentTable !== null && $needestParentTable !== '')
        {
            $needestParentTables = explode('|',$needestParentTable);
        }
        
        $needestChildTable = $request->query->get('needestChildTables');
        $needestChildTables = [];
        if ($needestChildTable !== null && $needestChildTable !== '')
        {
            $needestChildTables = explode('|',$needestChildTable);
        }
        
        $filters = [];
        if ($filterParameter !== null) {
            $filterArray = json_decode($filterParameter);
            for ($i = 0; $i < count($filterArray); $i++) {
                $filterInfo = get_object_vars($filterArray[$i]);
                array_push($filters, $filterInfo);
            }
        }
        $sorters = [];
         if ($sorterParameter !== null) {
            $sorterArray = json_decode($sorterParameter);
            for ($i = 0; $i < count($sorterArray); $i++) {
                $sorterInfo = get_object_vars($sorterArray[$i]);
                array_push($sorters, $sorterInfo);
            }
        }
        
        $em = $this->container->get('doctrine')->getEntityManager();
        $queryBuilder = $em->createQueryBuilder();
        
        
        
        $queryBuilder->select('tblMain')->from( "BugKiller\DataBundle\Entity\\".$table,'tblMain');
        
             
        $parameters = [];
        $wheres = [];
        for ($i = 0; $i < count($filters); $i++) {
            $filter = $filters[$i];
            if (isset($filter["operator"]) === false) {
                $where = "tblMain." . $filter["property"] . " = ?" . ($i);
                $parameters[$i] = $filter["value"];
                array_push($wheres, $where);
            } else {
                $operator = $filter["operator"];
                switch ($operator) {

                    case 'in':
                        $where = "tblMain." . $filter["property"] . " IN (?" . ($i) . ")";
                        $parameters[$i] = array_values($filter["value"]);
                        array_push($wheres, $where);
                        break;
                     case 'like':
                        $where = "tblMain." . $filter["property"] . " LIKE ?" . ($i) . "";
                        $parameters[$i] = "%".$filter["value"]."%";
                        array_push($wheres, $where);
                        break;
                }
            }
        }
        
       
        
        
        if ($idParameter !== null && $idParameter !== '') {
            $where = "tblMain.id = ?" . ($i);
            $parameters[$i] = $idParameter;
            array_push($wheres, $where);
        }
        if (count($wheres) > 0) {
            $queryBuilder->where(implode(' AND ', $wheres))->setParameters($parameters);
        }
        
        // Création clausse sort
        if (count($sorters) > 0) {
             for ($i = 0 ; $i < count($sorters);$i++)
             {
                $sorter = $sorters[$i]; 
                $queryBuilder->orderBy('tblMain.'.$sorter["property"], $sorter["direction"]);
                 
             }
          
        }
         $items = null;
       
         if (    $pageParameter !== null && 
                $pageParameter !== '' && 
                $startParameter !== null && 
                $startParameter !== '' && 
                $limitParameter!== null && 
                $limitParameter !== '')
        {
              $query = $queryBuilder->getQuery();
            $query->setFirstResult($startParameter)->setMaxResults($limitParameter);
           $paginator = new Paginator($query, $fetchJoinCollection = true);
           $items = $paginator;
          
        }
        else
        {
             $query = $queryBuilder->getQuery();
             $items = $query->getResult();
             
        }
       
        $json = [];
        $datas = [];
       
        
        foreach ($items as $item)
        {
            $jsonItem = $item->getJson($em);
          
            for ($i = 0; $i < count($needestParentTables); $i++) {
                $getter =  'get'.$needestParentTables[$i];
                $parentItem = $item->$getter();
                $jsonKeyName = strtolower(substr($needestParentTables[$i],0,1)).substr($needestParentTables[$i],1) ;
                if ($parentItem !== null)
                {$jsonItem[$jsonKeyName] = $parentItem->getJson($em);   }
                else
                {$jsonItem[$jsonKeyName] = null;}
                              
             }
             for ($i = 0; $i < count($needestChildTables); $i++) 
             {
                 $getter =  'get'.$needestChildTables[$i]."s";                
                 $childItems = $item->$getter();
                 
                 $jsonKeyName = strtolower(substr($needestChildTables[$i],0,1)).substr($needestChildTables[$i],1)."s" ;
                 $childJsons = [];
                 foreach ($childItems->toArray() as $childItem){
                     $childJson = $childItem->getJson($em);
                     array_push($childJsons,$childJson);
                 }
                 $jsonItem[$jsonKeyName]=$childJsons;
             }
            array_push($datas, $jsonItem);
        }
       
         
        $json['datas'] = $datas;
        $json['success'] = true;
        $json['total'] = count($items);
        $json['message'] = $needestParentTable;
        $response = new Response();
        $response->setContent(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
