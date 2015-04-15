
Ext.define("BugKiller.view.client.Create", {
    extend: "Ext.window.Window",
    xtype: 'bk-client-create',
    requires: [
        'BugKiller.view.client.CreateController',
        'BugKiller.view.client.CreateModel'
    ],
    controller: "client-create",
    viewModel: {
        type: "client-create"
    },
    title:'Nouveau client',
    initComponent: function ()
    {
        this.items = [
            {
                xtype: 'form',
                items: [{
                        xtype: 'textfield',
                        allowBlank: false,
                        reference: 'txtName',
                        fieldLabel: 'Nom',
                        labelWidth: 160,
                        margin: 4,
                        bind: {
                            value: '{name}'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank: false,
                        reference: 'txtDelayReply',
                        fieldLabel: 'Délai de réponse (heures)',
                        minValue: 1,
                        maxValue: 99999,
                        labelWidth: 160,
                        margin: 4,
                        bind: {
                            value: '{delayReply}'
                        }
                        
                        
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank: false,
                        reference: 'txtDelayExec',
                        fieldLabel: 'Délai d\'éxécution (jours)',
                        labelWidth: 160,
                        minValue: 1,
                        maxValue: 99999,
                        margin: 4,
                        bind: {
                            value: '{delayExec}'
                        }
                    }],
                buttons: [{
                        text: 'Annuler',
                        handler: 'onCancel'
                    },
                    {
                        text: 'Valider',
                        formBind: true,
                        handler: 'onCommit'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }

});
