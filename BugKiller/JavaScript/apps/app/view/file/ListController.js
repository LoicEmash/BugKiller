Ext.define('BugKiller.view.file.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.file-list',
    initViewModel: function ()
    {
        var thumbStore = this.getViewModel().getStore('thumb');
        var gridFiles = this.lookupReference('gridFiles');
        var view = this.getView();
        var thumbs = view.getThumbs();
        gridFiles.setStore(thumbStore);
        thumbStore.loadData(thumbs);
        
    },
    onDownloadButtonClick : function()
    {
        var gridFiles = this.lookupReference('gridFiles');
        var gridStore = gridFiles.getStore('thumb');
        if (gridStore.getCount() > 0)
        {
             if (gridStore.getCount() > 1)
             {
                 var ids = [];
                 for (var i = 0 ; i < gridStore.getCount();i++)
                 {
                      var record = gridStore.getAt(i);
                      ids.push(record.get('id'));
                 }
                 var idString = ids.join("|");
                 window.open( document.egis.webServiceBaseUrl + '/FileZip/BkFio/'+idString+'/BugKiller.zip', "_blank");
             }
             else
             {
                 var record = gridStore.getAt(0);
                 window.open(record.get('content'), "_blank");
             }
        }
        
    },
    onFileItemDoubleClick : function(grid, record, item, index, e, eOpts)
    {
         window.open(record.get('content'), "_blank");
        
    },
    onUploadedFile: function ()
    {

        var thumbStore = this.getViewModel().getStore('thumb');
        var fileForm = this.lookupReference('fileForm');
        if (fileForm.isValid()) {
            fileForm.submit({
                url: document.egis.webServiceBaseUrl + '/File/BkFio',
                waitMsg: 'Transfert en cours',
                success: function (fp, o)
                {
                    var jsonFile = o.result.datas[0];
                    thumbStore.add({id: jsonFile.id, name: jsonFile.name});
                }
            });
        }
    }

});
