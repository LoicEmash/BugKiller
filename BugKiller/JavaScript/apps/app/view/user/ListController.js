Ext.define('BugKiller.view.user.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-list',
    
    onCancelButtonClick : function()
    {
        this.fireViewEvent('dashboardComeBack');
    }
   
    
});
