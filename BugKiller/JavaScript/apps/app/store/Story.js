Ext.define('BugKiller.store.Story', {
    extend: 'Ext.data.Store',
    requires: ['BugKiller.model.BkStory', 'Egis.data.SecureProxy'],
    model: 'BugKiller.model.BkStory',
    remoteFilter: true,
    remoteSort: true,
    sorters:[
        {
            property:'dc',
            direction:'DESC'
        }
    ],
    proxy: Ext.create('Egis.data.SecureProxy', {table: 'BkStory',useLimit:true}),
    constructor: function (config) {
       
        this.callSuper(arguments); 
       
         this.getProxy().setNeedestChildTables('BkPost|BkFio');
         this.getProxy().setNeedestParentTables('BkUser');
        
    }
    
});