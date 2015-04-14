/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('BugKiller.util.Model', {
    singleton: true,
    chainSave: function(models,callback,modelIndex) { 
        if (models === undefined)
        {
             callback();
             return;
        }
        if (models.length === 0)
        {
             callback();
             return;
        }
        var i = 0;
        if (modelIndex !== undefined)
        {
            i = modelIndex;
        }
        console.log('save mode '+i);
        var model= models[i];        
        model.save({
            callback: function (records, operation) {
                if (operation.wasSuccessful()) {
                    if (i < (models.length-1))
                    {
                        BugKiller.util.Model.chainSave(models,callback,i+1);
                    }
                    else
                    {
                        callback();
                    }
                }
            } 
        });
    },
    chainErase: function(models,callback,modelIndex) { 
        if (models === undefined)
        {
             callback();
             return;
        }
        if (models.length === 0)
        {
             callback();
             return;
        }
        var i = 0;
        if (modelIndex !== undefined)
        {
            i = modelIndex;
        }
        var model= models[i];        
        model.erase({
            callback: function (records, operation) {
                if (operation.wasSuccessful()) {
                    if (i < (models.length-1))
                    {
                        BugKiller.util.Model.chainErase(models,callback,i+1);
                    }
                    else
                    {
                        callback();
                    }
                }
            } 
        });
    },
    chainLoad: function(stores,callback,storeIndex) { 
        if (stores === undefined)
        {
             callback();
             return;
        }
        if (stores.length === 0)
        {
             callback();
             return;
        }
        var i = 0;
        if (storeIndex !== undefined)
        {
            i = storeIndex;
        }
        var store= stores[i];        
        store.load({
            callback: function (records, operation) {
                if (operation.wasSuccessful()) {
                    if (i < (stores.length-1))
                    {
                        BugKiller.util.Model.chainLoad(stores,callback,i+1);
                    }
                    else
                    {
                        callback();
                    }
                }
            } 
        });
    }
});


