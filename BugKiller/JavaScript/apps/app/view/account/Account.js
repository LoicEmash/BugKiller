
Ext.define("BugKiller.view.account.Account", {
    extend: "Ext.window.Window",
    requires: [
        'BugKiller.view.account.AccountController',
        'BugKiller.view.account.AccountModel'
    ],
    title:'Demande de création de compte',
    controller: "account-account",
    viewModel: {
        type: "account-account"
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',               
                width: 400,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: true,
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'txtName',
                        fieldLabel: 'Nom',                    
                        allowBlank: false,
                        margin: 4,
                        bind: {
                            value: '{name}'
                        }
                    },
                     {
                        xtype: 'textfield',
                        reference: 'txtFirstName',
                        fieldLabel: 'Prénom',                    
                        allowBlank: false,
                        margin: 4,
                        bind: {
                            value: '{firstName}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtMail',
                        fieldLabel: 'Adresse e-mail',
                        vtype: 'email',
                        allowBlank: false,
                        margin: 4,
                        bind: {
                            value: '{mail}'
                        }
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtPassword',
                        fieldLabel: 'Mot de passe',
                        allowBlank: false,
                        margin: 4,
                        inputType: 'password',
                        bind: {
                            value: '{password}'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Valider',
                        margin: 4,
                        handler: 'onValidateButtonClick',
                        formBind: true
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
  
});
