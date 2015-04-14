Ext.define('BugKiller.view.file.ListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.file-list',    
    stores: {
        thumb: {
            model: 'BugKiller.model.Thumb',
            proxy: {
                type: 'memory'
            },
            reader: {
                type: 'json'
            },
            autoLoad: false
        }
    }

});
