Ext.define('BugKiller.store.User', {
    extend: 'Ext.data.Store',
    requires: ['BugKiller.model.BkClient', 'Egis.data.SecureProxy'],
    model: 'BugKiller.model.BkUser',
    remoteFilter: true,
    remoteSort: true,
    storeId:'User',
    autoLoad:false,
    proxy: Ext.create('Egis.data.SecureProxy', {table: 'BkUser',useLimit:false})
    
    
});