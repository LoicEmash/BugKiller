Ext.define('BugKiller.model.BkUser', {
extend: 'BugKiller.model.BkBase',
requires : ['BugKiller.model.BkBase','Egis.data.SecureProxy','BugKiller.model.BkClient'],
	proxy: Ext.create('Egis.data.SecureProxy',{ table:'BkUser'}),
	fields : [
	{name: 'id', type: 'int', allowNull: false},
	{name: 'bkClientId', type: 'int', allowNull: true, reference:  'BkClient'},
	{name: 'mail', type: 'string', allowNull: false},
	{name: 'password', type: 'string', allowNull: false},
	{name: 'name', type: 'string', allowNull: false}
]
});
