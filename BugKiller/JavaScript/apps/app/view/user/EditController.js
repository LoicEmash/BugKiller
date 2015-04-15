Ext.define('BugKiller.view.user.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-edit',
    initViewModel : function()
    {
        var user = this.getView().getUser();
        var viewModel = this.getViewModel();
        viewModel.set('name',user.get('name'));
        viewModel.set('mail',user.get('mail'));
        viewModel.set('clientId',user.get('bkClientId'));
    },
    onCancel: function ()
    {
        this.fireViewEvent('userEdited');
        this.getView().close();
    },
    onCommit: function ()
    {
        var me = this;
        var name = this.getViewModel().get('name');
        var mail = this.getViewModel().get('mail');
        var clientId = this.getViewModel().get('clientId');
        var user = this.getView().getUser();
        user.set('name', name);
        user.set('mail', mail);
        user.set('bkClientId', clientId);
        user.save({
            success: function (rec, op) {
                me.fireViewEvent('userEdited');
                me.getView().close();
                Ext.Msg.alert("Utilisateur modifier", "L\'utilisateur "+name+" as bien été modifié");
            },
            failure: function (rec, op) {
                
                Ext.Msg.alert("Erreur", op.request.scope.reader.jsonData["message"]);
            }
        });
        
    }
    
});
