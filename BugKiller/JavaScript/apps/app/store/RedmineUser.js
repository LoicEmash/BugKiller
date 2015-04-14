Ext.define('BugKiller.store.RedmineUser', {
    extend: 'Ext.data.Store',
    requires: 'BugKiller.model.RedmineUser',
    model: 'BugKiller.model.RedmineUser',
    proxy: {
        type: 'ajax',
        url: document.egis.redmineUrl+'/users.json?key='+document.egis.redmineKey,
        reader: {
            type: 'json',
            rootProperty: 'users',
            totalProperty: 'total_count'
        }
    },
    autoLoad: false
    
});