Ext.define('BugKiller.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboard',
    requires:[
       
    ],   
    
    onStoryEditingCancel : function()
    {
        var panelStoryEdit =this.lookupReference('panelStoryEdit');  
        var panelStoryList  = this.lookupReference('panelStoryList');
        var panelStoryCreate  = this.lookupReference('panelStoryCreate');
        panelStoryEdit.hide();
        panelStoryCreate.hide();
        panelStoryList.show();
    },
    onStoryEditingSuccess : function()
    {
        var panelStoryEdit =this.lookupReference('panelStoryEdit');  
        var panelStoryList  = this.lookupReference('panelStoryList');
        var panelStoryCreate  = this.lookupReference('panelStoryCreate');
         var gridStoryList   = this.lookupReference('gridStoryList');          
        panelStoryEdit.hide();
        panelStoryCreate.hide();
        panelStoryList.show();
       gridStoryList.getController().loadStory();      
    },
    onStoryDoubleClick : function(storyRecord)
    {
        
        var panelStoryEdit =this.lookupReference('panelStoryEdit');  
        var panelStoryList  = this.lookupReference('panelStoryList');
        var panelStoryCreate  = this.lookupReference('panelStoryCreate');
        panelStoryList.hide();
        panelStoryCreate.hide();
        panelStoryEdit.show();
        panelStoryEdit.getController().loadStory(storyRecord.get('id'),storyRecord.get('bkPostState'));
        
        
    },   
    onCreateStoryButtonClick : function()
    {
        var panelStoryList  = this.lookupReference('panelStoryList');
        var panelStoryCreate  = this.lookupReference('panelStoryCreate');
        panelStoryList.hide();
        panelStoryCreate.show();
    },
    onStoryCreationCancel : function()
    {
        var panelStoryList  = this.lookupReference('panelStoryList');
        var panelStoryCreate  = this.lookupReference('panelStoryCreate');
        panelStoryList.show();
        panelStoryCreate.hide();
    },
    onStoryCreationSuccess : function()
    {
        console.log('onStoryCreationSuccess');
        var panelStoryList  = this.lookupReference('panelStoryList');
        var panelStoryCreate  = this.lookupReference('panelStoryCreate');      
        var gridStoryList   = this.lookupReference('gridStoryList');   
        panelStoryList.show();
        panelStoryCreate.hide();        
        gridStoryList.getController().loadStory();      
      
        
    }
    
});
