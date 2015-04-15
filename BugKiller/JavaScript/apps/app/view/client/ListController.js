Ext.define('BugKiller.view.client.ListController', {
    requires: [
        'BugKiller.view.client.Create',
        'BugKiller.view.client.Edit'
    ],
    extend: 'Ext.app.ViewController',
    alias: 'controller.client-list',
    onCancelButtonClick: function ()
    {
        this.fireViewEvent('dashboardComeBack');
    },
    loadData: function ()
    {
        var gridClient = this.lookupReference('gridClient');
        gridClient.getStore().load();

    },
    onEditClient: function (grid, rowIndex, colIndex)
    {
       
        var rec = grid.getStore().getAt(rowIndex);
        this.editClient(rec);
       
    },
    editClient : function(record)
    {
         var gridClient = this.lookupReference('gridClient');
         var view = Ext.create('BugKiller.view.client.Edit', {
            client: record
        });
        view.on('clientEdited', function () {
            gridClient.getStore().load();
        });
        view.show();
        
    },
    onGridCellDoubleClick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {
        this.editClient(record);
    },
    onCreateClient: function ()
    {
        var gridClient = this.lookupReference('gridClient');
        console.log('on create client');
        var view = Ext.create('BugKiller.view.client.Create');
        view.on('clientCreated', function () {
            gridClient.getStore().load();
        });
        view.show();
    },
    onDeleteClient: function (grid, rowIndex, colIndex)
    {
         var gridClient = this.lookupReference('gridClient');
        console.log('on delete client');
        var rec = grid.getStore().getAt(rowIndex);
        var name = rec.get('nom');
        Ext.Msg.show({
            title: 'Confirmation de supression',
            message: 'Etes-vous sur de vouloir supprimer le client ' +name + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    rec.erase({
                        success: function (rec, op) {                           
                            Ext.Msg.alert("Client supprimer", "Le client " + name + " as bien été supprimé");
                            gridClient.getStore().load();
                        },
                        failure: function (rec, op) {

                            Ext.Msg.alert("Erreur", op.request.scope.reader.jsonData["message"]);
                        }
                    });
                }
            }
        });
    }
});
