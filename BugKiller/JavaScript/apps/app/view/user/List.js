
Ext.define("BugKiller.view.user.List", {
    extend: "Ext.panel.Panel",
    xtype: 'bk-user-list',
    requires: [
        'BugKiller.view.user.ListController',
        'BugKiller.view.user.ListModel'
    ],
    controller: "user-list",
    viewModel: {
        type: "user-list"
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: true,
    title: 'Liste des utilisateurs',
    initComponent: function ()
    {
        this.items = [
            {
                xtype: 'grid',
                reference: 'gridUser',
                flex: 1,
                border: true,
                store: 'User',
                columns: [
                    {text: 'Id', dataIndex: 'id'},
                    {text: 'Client', flex: 1, width: 140, dataIndex: 'bkClientId',
                        renderer: function (value) {
                             var clientStore = Ext.data.StoreManager.lookup('Client');
                             var client = clientStore.findRecord('id',value);
                             if (client !== null)
                             {return client.get('nom'); }
                             else
                             {return null; }
                        }
                    },
                    {text: 'Nom', dataIndex: 'name', flex: 1},
                    {text: 'Mail', width: 140, dataIndex: 'mail', flex: 1},
                    {
                        xtype: 'actioncolumn',
                        text: 'Modifier',
                        width: 100,
                        items: [{
                                icon: 'resources/icons/table_edit.png',
                                tooltip: 'Modifier',
                                text: 'Modifier',
                                handler: 'onEditUser'
                            }]
                    },
                    {
                        xtype: 'actioncolumn',
                        text: 'Supprimer',
                        width: 100,
                        items: [{
                                icon: 'resources/icons/table_delete.png',
                                tooltip: 'Supprimer',
                                text: 'Supprimer',
                                handler: 'onDeleteUser'
                            }]
                    }

                ], listeners: {
                    celldblclick: 'onGridCellDoubleClick'
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
                        width: 200,
                        height: 48,
                        margin: 4,
                        text: 'Retour à la liste',
                        handler: 'onCancelButtonClick'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-create',
                        width: 200,
                        height: 48,
                        margin: 4,
                        text: 'Nouvel utilisateur',
                        handler: 'onCreateUser'

                    }
                ]
            }
        ];
        this.callParent(arguments);
    }


});
