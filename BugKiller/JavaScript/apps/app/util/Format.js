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
        console.log(keyValues.constructor);
        if (typeof keyValues !== 'object')
        {
            throw "Le paramètre keyValues doit être un objet";
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


