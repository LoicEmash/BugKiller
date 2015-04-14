
Ext.define("BugKiller.view.story.List", {
    extend: "Ext.panel.Panel",
    requires: [
        'BugKiller.view.story.ListController',
        'BugKiller.view.story.ListModel',
        'Ext.toolbar.Paging'

    ],
    xtype: 'story-list',
    controller: "story-list",
    viewModel: {
        type: "story-list"
    },
    layout: 'fit',
    initComponent: function () {

        this.items = [
            {
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                title: 'Liste des observations',
                items: [
                    {
                        xtype: 'panel',
                        title: 'Filtres',
                        border: true,
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Produit',
                                margin: 4,
                                displayField: 'name',
                                reference: 'comboProduct',
                                enableKeyEvents: true,
                                width: 200,
                                labelWidth: 80,
                                allowBlank: false,
                                valueField: 'name',
                                editable: true,
                                store: 'RedmineProduct',
                                listeners: {
                                    change: 'onComboProductChange',
                                    keyup:'onComboProductKeyUp'
                                }

                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Application',
                                enableKeyEvents: true,
                                margin: 4,
                                displayField: 'name',
                                reference: 'comboApp',
                                width: 200,
                                labelWidth: 80,
                                allowBlank: false,
                                valueField: 'name',
                                editable: true,
                                store: 'RedmineApplication',
                                listeners: {
                                    change: 'onComboAppChange',
                                    keyup:'onComboAppKeyUp'
                                }

                            },
                            {
                                xtype: 'combo',
                                allowBlank: false,
                                queryMode: 'local',
                                displayField: 'name',
                                margin: 4,
                                maxWidth: 300,
                                labelWidth: 80,
                                reference: 'comboState',
                                editable: true,
                                fieldLabel: 'Etat',
                                valueField: 'value',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                    ]
                                }),
                                listeners: {
                                    change: 'onComboStateChange',
                                    keyup:'onComboStateKeyUp'
                                }

                            },

                        ]
                    },
                    {
                        xtype: 'grid',
                        title: 'Observations',
                        flex: 1,
                        border: true,
                        store: 'VStory',
                        columns: [
                            {text: 'Id', dataIndex: 'id', width: 60},
                            {text: 'Produit', dataIndex: 'bkStoryProd', minWidth: 120},
                            {text: 'Application', dataIndex: 'bkStoryApp', minWidth: 120},
                            {text: 'Raporteur', dataIndex: 'bkUserName', minWidth: 120},
                            {text: 'Date de création', dataIndex: 'bkStoryDc', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), width: 140},
                            {text: 'Etat', dataIndex: 'bkPostState', renderer: function (val, meta, record, rowIndex) {


                                    if (BugKiller.Locale.stateValues[val] !== undefined)
                                    {
                                        return  BugKiller.Locale.stateValues[val];
                                    }
                                    else
                                    {
                                        return val;
                                    }



                                }
                            },
                            {text: 'Titre', dataIndex: 'bkStoryTitle', flex: 1},
                            {text: 'Nbr messages', dataIndex: 'bkPostCount'},
                            {text: 'Nbr fichiers', dataIndex: 'bkFioCount'},
                            {text: 'Sévérité', dataIndex: 'bkStorySev', renderer: BugKiller.util.Format.keyValueRenderer(BugKiller.Locale.severityValues)},
                            {text: 'Priorité', dataIndex: 'bkStoryPrio', renderer: BugKiller.util.Format.keyValueRenderer(BugKiller.Locale.priorityValues)},
                            {text: 'Reproductible', dataIndex: 'bkStoryRepro', renderer: BugKiller.util.Format.keyValueRenderer(BugKiller.Locale.reproductibilityValues)},
                            /*
                             
                             
                             { text: 'Etat', renderer: function (val, meta, record, rowIndex) {
                             record.bkPosts().sort('dc', 'DESC');
                             var lastPost = record.bkPosts().getAt(0);
                             if (lastPost !== null)
                             {
                             var state = lastPost.get('state');
                             if (BugKiller.Locale.stateValues[state] !== undefined)
                             {return  BugKiller.Locale.stateValues[state];}
                             else
                             {return state;}
                             
                             }
                             else
                             {
                             return null;
                             }
                             
                             }
                             },
                             {text: 'Titre', dataIndex: 'title', flex: 1},
                             {text: 'Messages', width: 80, renderer: function (val, meta, record, rowIndex) {
                             return record.bkPosts().getCount();                                    
                             }
                             },
                             {text: 'Sévérité', dataIndex: 'sev', renderer: BugKiller.util.Format.keyValueRenderer(BugKiller.Locale.severityValues)},
                             {text: 'Priorité', dataIndex: 'prio', renderer: BugKiller.util.Format.keyValueRenderer(BugKiller.Locale.priorityValues)},
                             {text: 'Reproductible', dataIndex: 'repro', renderer: BugKiller.util.Format.keyValueRenderer(BugKiller.Locale.reproductibilityValues)},
                             */


                        ],
                        dockedItems: [{
                                xtype: 'pagingtoolbar',
                                store: 'VStory',
                                dock: 'bottom',
                                displayInfo: true
                            }],
                        listeners: {
                            celldblclick: 'onGridCellDoubleClick'
                        }
                    }

                ]
            }

        ];
        this.callParent(arguments);
    }
});
