
Ext.define("BugKiller.view.client.Edit", {
    extend: "Ext.window.Window",
    requires: [
        'BugKiller.view.client.EditController',
        'BugKiller.view.client.EditModel'
    ],
    title: 'Modifier un client',
    xtype: 'bk-client-edit',
    controller: "client-edit",
    viewModel: {
        type: "client-edit"
    },
    config:{
        client:null
    },
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
