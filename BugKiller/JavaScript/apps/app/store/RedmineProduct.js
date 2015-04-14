Ext.define('BugKiller.store.RedmineProduct', {
    extend: 'Ext.data.Store',
    requires: 'BugKiller.model.RedmineProject',
    model: 'BugKiller.model.RedmineProject',
    proxy: {
        type: 'ajax',
        url: document.egis.redmineUrl+'/projects.json?key='+document.egis.redmineKey,
        reader: {
            type: 'json',
            rootProperty: 'projects',
            totalProperty: 'total_count'
        }
    },
    autoLoad: false,
    filters: [
        function (item) {
            var isBugKillerProduct = false;
            if (item.data.custom_fields !== undefined)
            {
                for (var i = 0; i < item.data.custom_fields.length; i++)
                {
                    if (item.data.custom_fields[i].name === 'ShowAsBugKillerProduct')
                    {
                        isBugKillerProduct = item.data.custom_fields[i].value === '1';
                    }
                }
            }
            return isBugKillerProduct;
        }
    ]
});