
Ext.define("BugKiller.view.login.Login", {
    extend: "Ext.panel.Panel",
    xtype: 'login',
    hidden:true,
    requires: [
        'BugKiller.view.login.LoginController',
        'BugKiller.view.login.LoginModel',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],
    controller: "login-login",
    viewModel: {
        type: "login-login"
    },
    layout: 'center',
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                title: 'Authentification utilisateur',
                width: 400,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: true,
                items: [
                    {
                        xtype: 'textfield',
                        reference:'txtMail',
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
                        reference:'txtPassword',
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
                        text: 'Connexion',
                        margin: 4,
                        handler:'onConnectButtonClick',
                        formBind : true
                    },
                    {
                        xtype: 'button',
                        text: 'Créer un compte',
                        margin: 4,
                        handler:'onCreateAccountButtonClick',
                        formBind : false
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
