
Ext.define("BugKiller.view.client.List", {
    extend: "Ext.panel.Panel",
    requires: [
        'BugKiller.view.client.ListController',
        'BugKiller.view.client.ListModel',
    ],
    title: 'Liste des clients',
    xtype: 'bk-client-list',
    controller: "client-list",
    viewModel: {
        type: "client-list"
    },
    layout: {
        type: 'vbox',
        align: 'stretch'

    },
    border: true,
    initComponent: function ()
    {
        this.items = [
            {
                xtype: 'grid',
                reference: 'gridClient',
                flex: 1,
                border: true,
                store: 'Client',
                columns: [
                    {text: 'Id', dataIndex: 'id'},
                    {text: 'Délai de réponse', width: 140, dataIndex: 'repDel'},
                    {text: 'Délai d\'éxécution', width: 140, dataIndex: 'exeDel'},
                    {text: 'Nom', dataIndex: 'nom', flex: 1},
                    {
                        xtype: 'actioncolumn',
                        text: 'Modifier',
                        width: 100,
                        items: [{
                                icon: 'resources/icons/table_edit.png',
                                tooltip: 'Modifier',
                                text: 'Modifier',
                                handler: 'onEditClient'
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
                                handler: 'onDeleteClient'
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
                        text: 'Nouveau client',
                        handler: 'onCreateClient'

                    },
                ]
            }
        ];
        this.callParent(arguments);
    }



});
