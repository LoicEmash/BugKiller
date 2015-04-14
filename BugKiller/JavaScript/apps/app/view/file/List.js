
Ext.define("BugKiller.view.file.List", {
    extend: "Ext.panel.Panel",
    requires: [
        'BugKiller.view.file.ListController',
        'BugKiller.view.file.ListModel'
    ],
    xtype: 'file-list',
    controller: "file-list",
    viewModel: {
        type: "file-list"
    },
    layout: {
        type:'vbox',
        align:'stretch'
    },
    minHeight: 280,
    maxHeight: 280,    
    height: 280,
    config: {
        readOnly: false,
        allowDownload:false,
        thumbs: []
    },
    clearFiles: function ()
    {
        var thumbStore = this.getController().getViewModel().getStore('thumb');
        thumbStore.loadData([]);
    },
    getFileIds: function ()
    {
        var thumbStore = this.getController().getViewModel().getStore('thumb');
        var ids = [];
        for (var i = 0; i < thumbStore.getCount(); i++)
        {
            ids.push(thumbStore.getAt(i).get('id'));
        }
        return ids;
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                border: false,
                flex: 1,
                minHeight: 200,
                maxHeight: 200,
                height: 200,
                maxWidth: 600,
                reference: 'gridFiles',
                viewConfig: {
                    listeners: {
                        render: function (view) {
                            view.tip = Ext.create('Ext.tip.ToolTip', {
                                // The overall target element.
                                target: view.el,
                                // Each grid row causes its own seperate show and hide.
                                delegate: view.itemSelector,
                                // Moving within the row should not hide the tip.
                                trackMouse: true,
                                // Render immediately so that tip.body can be referenced prior to the first show.
                                renderTo: Ext.getBody(),
                                width: 400,
                                height: 400,
                                html: 'Informations sur l\'image',
                                listeners: {
                                    // Change content dynamically depending on which element triggered the show.
                                    beforeshow: function (tip) {
                                        var record = view.getRecord(tip.triggerElement);
                                        tip.setWidth(400);
                                        tip.setHeight(400);
                                        tip.setHtml('<img width=\"400\" height=\"400\" src=\"' + document.egis.webServiceBaseUrl + '/FileThumb/BkFio/' + record.get('id') + '/400\" />');
                                    }
                                }
                            });
                        }
                    }
                },
                listeners : {
                    itemdblclick :'onFileItemDoubleClick'
                },
                columns: [
                    {text: 'Nom', dataIndex: 'name', width: 300},
                    {text: 'Aperçu', width: 80, dataIndex: 'id',
                        renderer: function (value) {
                            return '<img src=\"' + document.egis.webServiceBaseUrl + '/FileThumb/BkFio/' + value + '/64\" />';
                        }}
                ],
            },
            {
                xtype: 'form',
                layout: 'fit',
                reference: 'fileForm',
                items: [
                    {
                        xtype: 'filefield',
                        name: 'file',
                        margin: 4,
                        hidden: this.getReadOnly(),
                        allowBlank: false,
                        buttonOnly: true,
                        buttonText: 'Joindre un fichier',
                        listeners: {
                            change: 'onUploadedFile'
                        }
                    },
                    {
                        xtype:'button',
                        margin: 4,
                        hidden: !this.getAllowDownload(),
                        text:'Tout télécharger',
                        handler:'onDownloadButtonClick'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }


});
