Ext.define('BugKiller.view.client.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.client-list',
    onCancelButtonClick : function()
    {
        this.fireViewEvent('dashboardComeBack');
    },
    loadData : function()
    {
        var gridClient = this.lookupReference('gridClient');
        gridClient.getStore().load();
       
    },
    onEditClient : function(grid, rowIndex, colIndex)
    {
         var rec = grid.getStore().getAt(rowIndex);
    }
});
