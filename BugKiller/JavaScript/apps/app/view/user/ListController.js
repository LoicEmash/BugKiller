Ext.define('BugKiller.view.user.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-list',
    requires: [
        'BugKiller.view.user.Create',
        'BugKiller.view.user.Edit'
    ],
    loadData: function ()
    {
        var gridUser = this.lookupReference('gridUser');
        gridUser.getStore().load();

    },
    onCancelButtonClick: function ()
    {
        this.fireViewEvent('dashboardComeBack');
    },
    onEditUser: function (grid, rowIndex, colIndex)
    {
        console.log('onEditUser');
        var rec = grid.getStore().getAt(rowIndex);
        this.editUser(rec);
    },
    editUser: function (record)
    {
        console.log('editUser');
        var gridUser = this.lookupReference('gridUser');
        var view = Ext.create('BugKiller.view.user.Edit', {
            user: record
        });
        view.on('userEdited', function () {
            gridUser.getStore().load();
        });
        view.show();
    }
    ,
    onDeleteUser: function (grid, rowIndex, colIndex)
    {
        var gridUser = this.lookupReference('gridUser');

        var rec = grid.getStore().getAt(rowIndex);
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Confirmation de supression',
            message: 'Etes-vous sur de vouloir supprimer l\'utilisateur ' + name + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    rec.erase({
                        success: function (rec, op) {
                            Ext.Msg.alert("Utilisateur supprimer", "L\'utilisateur " + name + " as bien été supprimé");
                            gridUser.getStore().load();
                        },
                        failure: function (rec, op) {

                            Ext.Msg.alert("Erreur", op.request.scope.reader.jsonData["message"]);
                        }
                    });
                }
            }
        });
    }
    ,
    onCreateUser: function ()
    {
        var gridUser = this.lookupReference('gridUser');

        var view = Ext.create('BugKiller.view.user.Create');
        view.on('userCreated', function () {
            gridUser.getStore().load();
        });
        view.show();
    },
    onGridCellDoubleClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {
         this.editUser(record);
    }


});
