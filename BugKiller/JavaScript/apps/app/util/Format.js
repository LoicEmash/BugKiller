/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('BugKiller.util.Format', {
    singleton: true,
    keyValueRenderer: function(keyValues) {
       return function (value, metadata, record, rowIndex, colIndex, store)
       {
           if (keyValues.value === undefined)
           {return value; }
           else
           { return keyValues.value;}
          
       }
    }
});


