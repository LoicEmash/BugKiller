Ext.define('BugKiller.view.client.CreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.client-create',
    onCancel: function ()
    {
        this.fireViewEvent('clientCreated');
        this.getView().close();
    },
    onCommit: function ()
    {
        var me = this;
        var name = this.getViewModel().get('name');
        var delayReply = this.getViewModel().get('delayReply');
        var delayExec = this.getViewModel().get('delayExec');
        var client = Ext.create('BugKiller.model.BkClient');
        client.set('nom', name);
        client.set('repDel', delayReply);
        client.set('exeDel', delayExec);
        client.save({
            success: function (rec, op) {
                me.fireViewEvent('clientCreated');
                me.getView().close();
                Ext.Msg.alert("Client ajouté", "Le nouveau client "+name+" as bien été créé");
            },
            failure: function (rec, op) {
                Ext.Msg.alert("Erreur", op.request.scope.reader.jsonData["message"]);
            }
        });
        
    }

});
