Ext.define('BugKiller.util.Format', {
    singleton: true,
    keyValueRenderer: function(keyValues) {            
       return function (value)
       {           
           if (keyValues[value] === undefined)
           {return value; }
           else
           { return keyValues[value];}          
       } ;
    }
});


