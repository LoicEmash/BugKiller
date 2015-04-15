Ext.define('BugKiller.view.user.CreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-create',
    onCancel : function()
    {
        this.fireViewEvent('userCreated');
        this.getView().close();
    },
    onCommit : function()
    {
        var me = this;
        var name = this.getViewModel().get('name');
        var mail = this.getViewModel().get('mail');
        var password = this.getViewModel().get('password');
        var clientId = this.getViewModel().get('clientId');
        var md5password =  BugKiller.util.Crypto.md5(password);
        var user = Ext.create('BugKiller.model.BkUser');
        user.set('name', name);
        user.set('mail', mail);
        user.set('password', md5password);
        user.set('bkClientId', clientId);
        user.save({
            success: function (rec, op) {
                me.fireViewEvent('userCreated');
                me.getView().close();
                Ext.Msg.alert("Utilisateur ajouté", "Le nouvel utilisateur "+name+" as bien été créé");
            },
            failure: function (rec, op) {
                Ext.Msg.alert("Erreur", op.request.scope.reader.jsonData["message"]);
            }
        });
    }
    
});
