Ext.define('BugKiller.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login-login',
    requires: [
        'BugKiller.model.BkUser',
        'BugKiller.view.account.Account',
        'BugKiller.util.Crypto'
    ],
    initViewModel: function ()
    {
        var viewModel = this.getViewModel();
        var view = this.getView();
        var me = this;
        viewModel.data.mail = Ext.util.Cookies.get('BugKiller.Global.userMail');
        viewModel.data.password = Ext.util.Cookies.get('BugKiller.Global.userPassword');
        if (Ext.String.isDefined(viewModel.data.mail) && Ext.String.isDefined(viewModel.data.password))
        {
            this.authenticate(viewModel.data.mail, viewModel.data.password,
                    function (resultMail, resultPassword, resultName, resultId,isAdmin) {

                        me.fireViewEvent('authenticated', resultMail, resultPassword, resultName, resultId,isAdmin);

                    },
                    function (errorMessage) {
                        view.show();
                    });
        }
        else
        {
            view.show();
        }
    },
    onCreateAccountButtonClick: function ()
    {
        var accountView = Ext.create('BugKiller.view.account.Account');
        accountView.show();
    },
    authenticate: function (mail, password, callbackSuccess, callbackFailure)
    {
        var view = this.getView();
        var redmineUserStore = Ext.data.StoreManager.lookup('RedmineUser');
        redmineUserStore.load({
            scope: this,
            callback: function (redmineUserRecords, redmineUserOperation, redmineUserSuccess) {
                if (redmineUserSuccess === true)
                {
                   
                    var store = Ext.create('Ext.data.Store', {model: 'BugKiller.model.BkUser', remoteFilter: true});
                    store.clearFilter(true);
                    store.addFilter({
                        property: 'mail',
                        value: mail
                    }, true);
                    store.addFilter({
                        property: 'password',
                        value: password
                    }, true);

                    store.load({
                        scope: this,
                        callback: function (records, operation, success) {
                            var loggedSuccessfull = false;
                            var isAdmin = false;
                            if (success === true)
                            {
                                if (records.length === 1)
                                {
                                    var record = records[0];
                                    
                                    var mail = record.get('mail');
                                  
                                    for (var i = 0 ; i < redmineUserRecords.length;i++)
                                    {
                                        var redmineUserMail = redmineUserRecords[i].get('mail');
                                       
                                        if (redmineUserMail.toLowerCase() === mail.toLowerCase())
                                        {isAdmin = true;}
                                        
                                    }
                                    loggedSuccessfull = true;
                                }
                            }

                            if (loggedSuccessfull === false)
                            {
                                callbackFailure('Aucun utilisateur n\'existe avec les informations de connexion saisie.');
                            }
                            else
                            {
                                var name = store.getAt(0).get('name');
                                var id = store.getAt(0).get('id');
                               
                                callbackSuccess(mail, password, name, id,isAdmin);
                            }

                        }
                    });
                }
            }
        });


    },
    onConnectButtonClick: function ()
    {
        var me = this;
        var viewModel = this.getViewModel();
        var view = this.getView();
        view.disable();
        var mail = viewModel.data.mail;
        var password = viewModel.data.password;
        var md5Password = BugKiller.util.Crypto.md5(password);
        this.authenticate(mail, md5Password,
                function (resultMail, resultPassword, resultName, resultId,isAdmin) {
                    console.log(isAdmin);
                    me.fireViewEvent('authenticated', resultMail, resultPassword, resultName, resultId,isAdmin);
                    view.enable();
                },
                function (errorMessage) {
                    Ext.Msg.alert('Erreur', errorMessage);
                    view.enable();
                });
    }

});
