
Ext.define("BugKiller.view.user.List",{
    extend: "Ext.panel.Panel",
    xtype:'bk-user-list',
    requires:[
        'BugKiller.view.user.ListController',
        'BugKiller.view.user.ListModel'
    ],
    controller: "user-list",
    viewModel: {
        type: "user-list"
    },
    layout: {
        type: 'vbox',
        align:'stretch'
    },
    border :true,
    title:'Liste des utilisateurs',
    initComponent: function ()
    {
        this.items = [
            {
                xtype: 'panel',
                flex: 1,
                 border :true
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
                        width: 200,
                        height: 48,
                        margin: 4,
                        text: 'Retour à la liste',
                        handler: 'onCancelButtonClick'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }

    
});
