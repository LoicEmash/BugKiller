
Ext.define("BugKiller.view.user.Create",{
    extend: "Ext.window.Window",
    requires:[
        'BugKiller.view.user.CreateController',
        'BugKiller.view.user.CreateModel'
    ],
    xtype:'bk-user-create',
    controller: "user-create",
    viewModel: {
        type: "user-create"
    },
    title:'Nouvel utilisateur',
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
                        xtype: 'textfield',
                        allowBlank: false,
                        reference: 'txtPassword',
                        fieldLabel: 'Mot de passe',                        
                        labelWidth: 160,
                        inputType: 'password',
                        margin: 4,
                        bind: {
                            value: '{password}'
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
