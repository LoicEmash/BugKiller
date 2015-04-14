
Ext.define("BugKiller.view.story.Header",{
    extend: "Ext.panel.Panel",

    xtype:'story-header',
    config:{
        readOnly:false
        
    },
    layout:{
        type:'vbox',
        align:'stretch'
    },
    onComboProductChange: function (combo, newValue, oldValue, eOpts)
    {
        var store = Ext.data.StoreManager.lookup('RedmineApplication');      
        store.clearFilter();
        store.addFilter(function (item)
        {
            

            if (item.data.parent !== undefined)
            {
                if (item.data.parent.name === newValue)
                {
                    return true;
                }
            }
            return false;
        });
       

    },
    initComponent: function ()
    {        
        
        this.items = [
            {
                xtype: 'panel',                
                border: false,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: 'Produit',
                        margin: 4,
                        readOnly: this.getReadOnly(),
                        displayField: 'name',
                        reference: 'comboProduct',
                        width: 200,
                        labelWidth: 80,
                        queryMode:'local',
                        allowBlank: false,
                        valueField: 'name',
                        editable: false,
                        store: 'RedmineProduct',
                        bind: {
                            value: '{storyProduct}'
                        },
                        listeners : {
                            change : this.onComboProductChange
                        }

                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Application',
                        queryMode:'local',
                        reference: 'comboApplication',
                        readOnly: this.getReadOnly(),
                        margin: 4,
                        width: 220,
                        labelWidth: 80,
                        displayField: 'name',
                        valueField: 'name',
                        allowBlank: false,
                        editable: false,
                        store: 'RedmineApplication',
                        bind: {
                            value: '{storyApplication}'
                        }
                    },
                    {
                        xtype: 'combo',
                        allowBlank: false,
                        readOnly: this.getReadOnly(),
                        queryMode: 'local',
                        displayField: 'name',
                        margin: 4,
                        width: 160,
                        labelWidth: 60,
                        reference: 'comboSeverity',
                        editable: false,
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
                        bind: {
                            value: '{storySeverity}'
                        }

                    },
                    {
                        xtype: 'combo',
                        allowBlank: false,
                        queryMode: 'local',
                        readOnly: this.getReadOnly(),
                        displayField: 'name',
                        margin: 4,
                        width: 160,
                        labelWidth: 60,
                        editable: false,
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
                        bind: {
                            value: '{storyPriority}'
                        }

                    },
                    {
                        xtype: 'combo',
                        allowBlank: false,
                        queryMode: 'local',
                        readOnly:this.getReadOnly(),
                        reference: 'comboReproductibility',
                        displayField: 'name',
                        margin: 4,
                        width: 160,
                        labelWidth: 80,
                        editable: false,
                        fieldLabel: 'Reproductible',
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {name: BugKiller.Locale.reproductibilityValues.yes, value: 'yes'},
                                {name: BugKiller.Locale.reproductibilityValues.no, value: 'no'}

                            ]
                        }),
                        bind: {
                            value: '{storyReproductibility}'
                        }

                    }
                ]
            },
             {
                xtype: 'textfield',
                fieldLabel: 'Titre',
                reference: 'txtTitle',
                allowBlank: false,
                margin: 4,              
                labelWidth: 80,               
                bind: {
                    value: '{storyTitle}'
                }
            }
            
        ];
        this.callParent(arguments);
    }
});
