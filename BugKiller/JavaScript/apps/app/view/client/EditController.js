Ext.define('BugKiller.view.client.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.client-edit',
    initViewModel : function()
    {
        var client = this.getView().getClient();
        var viewModel = this.getViewModel();
        viewModel.set('name',client.get('nom'));
        viewModel.set('delayReply',client.get('repDel'));
        viewModel.set('delayExec',client.get('exeDel'));
    },
    onCancel: function ()
    {
        this.fireViewEvent('clientEdited');
        this.getView().close();
    },
    onCommit: function ()
    {
        var me = this;
        var name = this.getViewModel().get('name');
        var delayReply = this.getViewModel().get('delayReply');
        var delayExec = this.getViewModel().get('delayExec');
        var client = this.getView().getClient();
        client.set('nom', name);
        client.set('repDel', delayReply);
        client.set('exeDel', delayExec);
        client.save({
            success: function (rec, op) {
                me.fireViewEvent('clientEdited');
                me.getView().close();
                Ext.Msg.alert("Client modifier", "Le client "+name+" as bien été modifié");
            },
            failure: function (rec, op) {
                
                Ext.Msg.alert("Erreur", op.request.scope.reader.jsonData["message"]);
            }
        });
        
    }
    
});
