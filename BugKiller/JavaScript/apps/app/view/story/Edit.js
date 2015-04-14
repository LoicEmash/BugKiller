
Ext.define("BugKiller.view.story.Edit", {
    extend: "Ext.panel.Panel",
    requires: [
        'BugKiller.view.story.EditController',
        'BugKiller.view.story.EditModel',
        'BugKiller.view.post.List',
        'BugKiller.view.story.Header'
    ],
    xtype: 'bk-story-edit',
    controller: "story-edit",
    viewModel: {
        type: "story-edit"
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    initComponent: function ()
    {

        var me = this;

        this.items = [
            {
                xtype: 'panel',
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        title: 'Observation',
                        border: true,
                        margin: '0 8 0 0',
                        flex: 1.5,
                        reference: 'panelStory',
                        items: [
                            {
                                xtype: 'story-header',
                                margin: 4,
                                border: false,
                                readOnly: true,
                            },
                            {
                                xtype: 'panel',
                                flex: 2,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        flex: 1,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'post-list',
                                                flex: 1,
                                                margin: 8,
                                                reference: 'postList',
                                            },
                                            {
                                                xtype: 'file-list',
                                                collapsible: true,
                                                allowDownload:true,
                                                reference: 'fileListStory',
                                                readOnly: true,
                                                margin: 0,
                                                flex: 1,
                                                title: 'Fichiers',
                                                collapsed: true,
                                                border: true
                                            }
                                           
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'Répondre',                        
                        border: true,
                        margin: '0 0 0 8',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'combo',
                                allowBlank: false,
                                queryMode: 'local',
                                displayField: 'name',
                                margin: 4,
                                maxWidth: 300,
                                labelWidth: 80,
                                reference: 'comboState',
                                editable: false,
                                fieldLabel: 'Etat',
                                valueField: 'value',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                    ]
                                }),
                                bind: {
                                    value: '{postState}'
                                }

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
                                            value: '{postContent}'
                                        }
                                    },
                                    {
                                        xtype: 'file-list',
                                        reference: 'fileList',
                                        margin: 0,
                                        title:'Fichiers',
                                        collapsible:true,
                                        collapsed:false,
                                        border: true
                                    }
                                    /*
                                     {
                                     xtype: 'panel',
                                     layout: {
                                     type: 'hbox',
                                     align: 'stretch'
                                     },
                                     items: [
                                     {
                                     xtype: 'label',
                                     width: 80,
                                     text: 'Fichiers : ',
                                     margin: 4
                                     },
                                     
                                     ]
                                     }
                                     */


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
                                        text: 'Enregistrer',
                                        handler: 'onOkButtonClick'
                                    }
                                ]
                            }
                        ]
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
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
