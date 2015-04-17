Ext.define('BugKiller.util.Format', {
    singleton: true,
    keyValueRenderer: function(keyValues) {    
        if (keyValues === undefined)
        {
            throw "Le paramètre keyValues ne peut pas être undefined";
        }
        if (keyValues === null)
        {
            throw "Le paramètre keyValues ne peut pas être null";
        }
        if (keyValues.constructor !== Array)
        {
            throw "Le paramètre keyValues doit être un tableau";
        }
       return function (value)
       {           
           if (keyValues[value] === undefined)
           {return value; }
           else
           { return keyValues[value];}          
       };
    }
});


