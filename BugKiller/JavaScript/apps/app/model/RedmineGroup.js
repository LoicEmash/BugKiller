Ext.define('BugKiller.model.RedmineGroup', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', allowNull: false},
        {name: 'mail', type: 'string', allowNull: false},
        
    ]
});
