Ext.define('BugKiller.store.Client', {
    extend: 'Ext.data.Store',
    requires: ['BugKiller.model.BkClient', 'Egis.data.SecureProxy'],
    model: 'BugKiller.model.BkClient',
    remoteFilter: true,
    remoteSort: true,
    storeId:'Client',
    autoLoad:false,
    proxy: Ext.create('Egis.data.SecureProxy', {table: 'BkClient',useLimit:false})
    
    
});