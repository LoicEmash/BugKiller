
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
                                    keyup: 'onFilterKeyUp'
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
                                    change: 'onComboFilterChange',
                                    keyup: 'onFilterKeyUp'
                                }

                            },
                            {
                                xtype: 'combo',
                                queryMode: 'local',
                                displayField: 'name',
                                enableKeyEvents: true,
                                margin: 4,
                                maxWidth: 300,
                                labelWidth: 60,
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
                                    change: 'onComboFilterChange',
                                    keyup: 'onFilterKeyUp'
                                }

                            },
                            {
                                xtype: 'textfield',
                                enableKeyEvents: true,
                                maxWidth: 300,
                                labelWidth: 40,
                                fieldLabel: 'Id',
                                reference: 'txtId',
                                listeners: {
                                    keyup: 'onFilterKeyUp'
                                }

                            }, {
                                xtype: 'combo',
                                queryMode: 'local',
                                displayField: 'name',
                                margin: 4,
                                width: 160,
                                enableKeyEvents: true,
                                labelWidth: 60,
                                reference: 'comboSeverity',
                                editable: true,
                                fieldLabel: 'Sévérité',
                                valueField: 'value',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: BugKiller.Locale.severityValues.minor, value: 'minor'},
                                        {name: BugKiller.Locale.severityValues.major, value: 'major'},
                                        {name: BugKiller.Locale.severityValues.critical, value: 'critical'}
                                    ]
                                }),
                                listeners: {
                                    change: 'onComboFilterChange',
                                    keyup: 'onFilterKeyUp'
                                }

                            },
                            {
                                xtype: 'combo',
                                queryMode: 'local',
                                displayField: 'name',
                                margin: 4,
                                width: 160,
                                labelWidth: 60,
                                editable: true,
                                enableKeyEvents: true,
                                fieldLabel: 'Priorité',
                                valueField: 'value',
                                reference: 'comboPriority',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: BugKiller.Locale.priorityValues.minor, value: 'minor'},
                                        {name: BugKiller.Locale.priorityValues.major, value: 'major'},
                                        {name: BugKiller.Locale.priorityValues.critical, value: 'critical'}
                                    ]
                                }),
                                listeners: {
                                    change: 'onComboFilterChange',
                                    keyup: 'onFilterKeyUp'
                                }

                            },
                            {
                                xtype: 'combo',
                                queryMode: 'local',
                                reference: 'comboReproductibility',
                                displayField: 'name',
                                margin: 4,
                                enableKeyEvents: true,
                                width: 160,
                                labelWidth: 80,
                                editable: true,
                                fieldLabel: 'Reproductible',
                                valueField: 'value',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: BugKiller.Locale.reproductibilityValues.yes, value: 'yes'},
                                        {name: BugKiller.Locale.reproductibilityValues.no, value: 'no'}

                                    ]
                                }),
                                listeners: {
                                    change: 'onComboFilterChange',
                                    keyup: 'onFilterKeyUp'
                                }

                            }
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
                            {text: 'Client', dataIndex: 'bkClientName', minWidth: 120},
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
                            {text: 'Réponse', dataIndex: 'replyDelay', renderer:
                                        function (value, metadata, record, rowIndex, colIndex, store)
                                        {
                                            var state = record.get('bkPostState');
                                            if (state === 'open')
                                            {
                                                metadata.style = "background-color:orange;";
                                            }
                                            else
                                            {
                                                var clientName = record.get('bkClientName');
                                                for (var i = 0; i < BugKiller.util.Redmine.clients.length; i++)
                                                {
                                                    var client = BugKiller.util.Redmine.clients[i];
                                                    if (client.get('nom') === clientName)
                                                    {
                                                        if (value <= client.get('repDel'))
                                                        {
                                                            metadata.style = "background-color:green;";
                                                        }
                                                        else
                                                        {
                                                            metadata.style = "background-color:red;";
                                                        }

                                                    }
                                                }
                                            }

                                        }
                            },
                            {text: 'Exécution', dataIndex: 'resolveDelay', renderer:
                                        function (value, metadata, record, rowIndex, colIndex, store)
                                        {
                                            var state = record.get('bkPostState');
                                            if (state === 'open' || state === 'ask')
                                            {
                                                metadata.style = "background-color:orange;";
                                            }
                                            else
                                            {
                                                var clientName = record.get('bkClientName');
                                                for (var i = 0; i < BugKiller.util.Redmine.clients.length; i++)
                                                {
                                                    var client = BugKiller.util.Redmine.clients[i];
                                                    if (client.get('nom')=== clientName)
                                                    {
                                                        if (value <= client.get('exeDel'))
                                                        {
                                                            metadata.style = "background-color:green;";
                                                        }
                                                        else
                                                        {
                                                            metadata.style = "background-color:red;";
                                                        }

                                                    }
                                                }
                                            }

                                        }},
                        ],
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
                                        html: 'Informations sur le rapport',
                                        listeners: {
                                            // Change content dynamically depending on which element triggered the show.
                                            beforeshow: function (tip) {
                                                var record = view.getRecord(tip.triggerElement);
                                                tip.setHtml(record.get('bkStoryTitle'));
                                            }
                                        }
                                    });
                                }
                            }
                        },
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
