
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
                                queryMode: 'local',
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
                                queryMode: 'local',
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
                             {text: 'Délai réponse', dataIndex: 'replyDelay'},
                            {text: 'Délai éxécution', dataIndex: 'resolveDelay'},


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
