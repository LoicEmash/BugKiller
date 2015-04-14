Ext.define('BugKiller.store.VStory', {
    extend: 'Ext.data.Store',
    requires: ['BugKiller.model.BkVStory', 'Egis.data.SecureProxy'],
    model: 'BugKiller.model.BkVStory',
    remoteFilter: true,
    remoteSort: true,
    sorters:[
        {
            property:'bkStoryDc',
            direction:'DESC'
        }
    ],
    proxy: Ext.create('Egis.data.SecureProxy', {table: 'BkVStory',useLimit:true}),
    constructor: function (config) {
       
        this.callSuper(arguments); 
       
         //this.getProxy().setNeedestChildTables('BkPost|BkFio');
        // this.getProxy().setNeedestParentTables('BkUser');
        
    }
    
});