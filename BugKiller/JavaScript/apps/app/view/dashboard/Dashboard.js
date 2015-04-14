
Ext.define("BugKiller.view.dashboard.Dashboard", {
    extend: "Ext.panel.Panel",
    xtype: 'bugDashboard',
    title: 'Tableau de bord BugKiller',
    requires: [
        'BugKiller.view.dashboard.DashboardController',
        'BugKiller.view.story.List',
        'BugKiller.view.story.Edit',
        'BugKiller.view.story.Create',
        'BugKiller.util.Format',
        'BugKiller.Locale',
        'Ext.ux.statusbar.StatusBar',
        'Ext.grid.Panel'

    ],
    controller: "dashboard-dashboard",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
     tools: [{ 
       
        handler: 'onCloseClick'
    }],
    initComponent: function () {
        var storyStore = Ext.create('Ext.data.Store', {model: 'BugKiller.model.BkStory', remoteFilter: true, remoteSort: true});
        storyStore.getProxy().setNeedestChildTables("BkPost");
        storyStore.getProxy().setNeedestParentTables("BkUser");

        this.items = [
            {
                xtype: 'panel',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                reference: 'panelStoryList',
                items: [
                    {
                        xtype: 'story-list',
                        margin: 16,
                        reference: 'gridStoryList',
                        flex: 1,
                        listeners: {
                            storyDoubleClick: 'onStoryDoubleClick'
                        }
                    },
                    {
                        xtype: 'toolbar',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                margin: 4,
                                width: 200,
                                height: 48,
                                text: 'Nouvelle observation',
                                handler: 'onCreateStoryButtonClick'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'bk-story-create',
                margin: 16,
                flex: 1,
                hidden: true,
                reference: 'panelStoryCreate',
                listeners: {
                    storyCreationCancel: 'onStoryCreationCancel',
                    storyCreationSuccess: 'onStoryCreationSuccess'
                }
            },
            {
                xtype: 'bk-story-edit',
                margin: 16,
                flex: 1,
                hidden: true,
                reference: 'panelStoryEdit',
                listeners: {
                    storyEditingCancel: 'onStoryEditingCancel',
                    storyEditingSuccess: 'onStoryEditingSuccess'
                }
            }


        ];
        this.callParent(arguments);
    }
});
