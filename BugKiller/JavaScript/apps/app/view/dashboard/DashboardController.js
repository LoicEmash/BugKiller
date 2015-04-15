Ext.define('BugKiller.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-dashboard',
    requires: [
    ],
    init: function ()
    {
        var btManageClient = this.lookupReference('btManageClient');
        var btManageUser = this.lookupReference('btManageUser');
        BugKiller.getApplication().on('userLogged', function () {
            if (BugKiller.Global.userIsAdmin === true)
            {
                btManageClient.show();
                btManageUser.show();
            }
            else
            {
                btManageClient.hide();
                btManageUser.hide();
            }
        });
    },
    onCloseClick: function ()
    {
        BugKiller.getApplication().fireEvent('userUnlogged');
    },
    hideAllPanel: function ()
    {
        var panelStoryEdit = this.lookupReference('panelStoryEdit');
        var panelStoryList = this.lookupReference('panelStoryList');
        var panelStoryCreate = this.lookupReference('panelStoryCreate');
        var panelClientList = this.lookupReference('panelClientList');
        var panelUserList = this.lookupReference('panelUserList');
        panelStoryEdit.hide();
        panelStoryList.hide();
        panelStoryCreate.hide();
        panelClientList.hide();
        panelUserList.hide();

    },
    onStoryEditingCancel: function ()
    {
        this.hideAllPanel();
        var panelStoryList = this.lookupReference('panelStoryList');
        panelStoryList.show();
    },
    onStoryEditingSuccess: function ()
    {
        this.hideAllPanel();
        var panelStoryList = this.lookupReference('panelStoryList');
        var gridStoryList = this.lookupReference('gridStoryList');

        panelStoryList.show();
        gridStoryList.getController().loadStory();
    },
    onStoryDoubleClick: function (storyRecord)
    {
        this.hideAllPanel();
        var panelStoryEdit = this.lookupReference('panelStoryEdit');
        panelStoryEdit.show();
        panelStoryEdit.getController().loadStory(storyRecord.get('id'), storyRecord.get('bkPostState'));


    },
    onCreateStoryButtonClick: function ()
    {
        this.hideAllPanel();
        var panelStoryCreate = this.lookupReference('panelStoryCreate');
        panelStoryCreate.show();
    },
    onStoryCreationCancel: function ()
    {
        this.hideAllPanel();
        var panelStoryList = this.lookupReference('panelStoryList');
        panelStoryList.show();

    },
    onStoryCreationSuccess: function ()
    {
        this.hideAllPanel();
        var panelStoryList = this.lookupReference('panelStoryList');
        var gridStoryList = this.lookupReference('gridStoryList');
        panelStoryList.show();
        gridStoryList.getController().loadStory();


    },
    onManageClientButtonClick: function ()
    {
        this.hideAllPanel();
        var panelClientList = this.lookupReference('panelClientList');
        panelClientList.getController().loadData();
        panelClientList.show();

    },
    onManageUserButtonClick: function ()
    {
        this.hideAllPanel();
        var panelUserList = this.lookupReference('panelUserList');
        panelUserList.show();
    },
    onDashboardComeBack : function()
    {
        this.hideAllPanel();
        var panelStoryList = this.lookupReference('panelStoryList');
        panelStoryList.show();
    }

});
