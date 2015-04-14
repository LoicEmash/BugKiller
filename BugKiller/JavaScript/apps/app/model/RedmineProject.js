Ext.define('BugKiller.model.RedmineProject', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', allowNull: false},
        {name: 'name', type: 'string', allowNull: false},
        {name: 'description', type: 'string', allowNull: false},
        {name: 'identifier', type: 'string', allowNull: false},
        //
    ]
});
