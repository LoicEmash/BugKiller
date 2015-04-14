
Ext.define("BugKiller.view.story.Create", {
    extend: "Ext.panel.Panel",
    requires: [
        'BugKiller.view.story.CreateController',
        'BugKiller.view.story.CreateModel',
        'BugKiller.model.RedmineProject',
        'BugKiller.Locale',
        'BugKiller.view.file.List',
        'BugKiller.view.story.Header',
        'Ext.form.*'

    ],
    title: 'Nouvelle observation',
    xtype: 'bk-story-create',
    controller: "story-create",
    border: true,
    viewModel: {
        type: "story-create"
    },
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'

    },
    initComponent: function ()
    {
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.cors = true;
        var me = this;

        this.items = [
            {
                xtype: 'story-header',
                readOnly: false
            },
            {
                xtype: 'panel',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Description',
                        reference: 'txtContent',
                        allowBlank: false,
                        margin: 4,
                        width: 200,
                        labelWidth: 80,
                        flex: 1,
                        bind: {
                            value: '{firstPostContent}'
                        }
                    },
                    {
                        xtype: 'file-list',
                        reference: 'fileList',
                        margin: 0,
                        title:'Fichiers',
                        collapsed:false,
                        collapsible:true,                       
                        border: true,
                        collapseDirection :'bottom'
                    }
                    


                ]
            },
            {
                xtype: 'toolbar',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        width: 200,
                        height: 48,
                        margin: 4,
                        text: 'Retour à la liste',
                        handler: 'onCancelButtonClick'
                    },
                    {
                        xtype: 'button',
                        width: 200,
                        height: 48,
                        margin: 4,
                        text: 'Enregistrer',
                        handler: 'onOkButtonClick'
                    }
                ]
            }



        ];
        this.callParent(arguments);
    }
});
