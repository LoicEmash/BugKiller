Ext.define('BugKiller.view.account.AccountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.account-account',
    onValidateButtonClick: function ()
    {
        var me = this;
        var txtClient = this.lookupReference('txtClient');
        var txtName = this.lookupReference('txtName');
        var txtFirstName = this.lookupReference('txtFirstName');
        var txtMail = this.lookupReference('txtMail');
        var txtPassword = this.lookupReference('txtPassword');
        var message = '--------- Demande de création de compte BugKiller ---------<br/>';
        message += 'Client : ' + txtClient.getValue() + '<br/>';
        message += 'Nom : ' + txtName.getValue() + '<br/>';
        message += 'Prénom : ' + txtFirstName.getValue() + '<br/>';
        message += 'Mail : ' + txtMail.getValue() + '<br/>';
        message += 'Password : ' + txtPassword.getValue() + '<br/>';
        
        this.getView().mask('Envoie du mail en cours ...');
        Ext.Ajax.request({
            url: document.egis.webServiceBaseUrl + '/Mail/support.eams@egis.fr',
            params: {
                subject: 'Création de compte BugKiller',
                message: message

            },
            success: function () {
                me.getView().unmask();
                Ext.Msg.alert('Succès', 'Le demande as été envoyé au support et seras traiter dans les plus bref délai.');
                me.getView().close();
                // process server response here
            },
            failure: function () {
                me.getView().unmask();
                Ext.Msg.alert('Erreur', 'Impossible d\'envoyer le mail au support.');
                me.getView().close();
             
            }
        });
    }

});
