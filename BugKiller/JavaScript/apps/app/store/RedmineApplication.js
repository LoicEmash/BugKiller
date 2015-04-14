Ext.define('BugKiller.store.RedmineApplication', {
    extend: 'Ext.data.Store',
    requires: 'BugKiller.model.RedmineProject',
    model: 'BugKiller.model.RedmineProject',
    /*
    proxy: {
        type: 'ajax',
        url: document.egis.redmineUrl+'/projects.json?key='+document.egis.redmineKey,
        reader: {
            type: 'json',
            rootProperty: 'projects',
            totalProperty: 'total_count'
        }
    },
    */
    autoLoad: false
    
});