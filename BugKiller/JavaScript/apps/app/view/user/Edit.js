
Ext.define("BugKiller.view.user.Edit",{
    extend: "Ext.window.Window",
    requires:[
        'BugKiller.view.user.EditController',
        'BugKiller.view.user.EditModel'
    ],
    xtype:'bk-user-edit',
    config:{
        user:null
    },
    controller: "user-edit",
    viewModel: {
        type: "user-edit"
    },

   title:'Modifier un utilisateur',
    initComponent: function ()
    {
        this.items = [
            {
                xtype: 'form',
                items: [{
                        xtype: 'textfield',
                        allowBlank: false,
                        reference: 'txtName',
                        fieldLabel: 'Nom complet',
                        labelWidth: 160,
                        margin: 4,
                        bind: {
                            value: '{name}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        reference: 'txtMail',
                        fieldLabel: 'E-mail',
                        vtype: 'email',
                        labelWidth: 160,
                        margin: 4,
                        bind: {
                            value: '{mail}'
                        }
                    },                    
                    
                    {
                        xtype: 'combo',
                        store:'Client',
                        editable:false,
                        allowBlank: false,
                        reference: 'comboClient',
                        fieldLabel: 'Client',                        
                        labelWidth: 160,
                        displayField: 'nom',
                        valueField: 'id',
                        margin: 4,
                        bind: {
                            value: '{clientId}'
                        }
                        
                        
                    }
                    ],
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
