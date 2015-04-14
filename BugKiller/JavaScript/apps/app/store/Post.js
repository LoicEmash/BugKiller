Ext.define('BugKiller.store.Post', {
    extend: 'Ext.data.Store',
    requires: ['BugKiller.model.BkPost', 'Egis.data.SecureProxy'],
    model: 'BugKiller.model.BkPost',
    remoteFilter: true,
    remoteSort: true,
    sorters:[
        {
            property:'id',
            direction:'DESC'
        }
    ],
    proxy: Ext.create('Egis.data.SecureProxy', {table: 'BkPost'}),
    constructor: function (config) {
       
        this.callSuper(arguments); 
       
         
         this.getProxy().setNeedestParentTables('BkUser');
        
    }
    
});