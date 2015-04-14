Ext.define('BugKiller.model.BkClient', {
extend: 'BugKiller.model.BkBase',
requires : ['BugKiller.model.BkBase','Egis.data.SecureProxy'],
	proxy: Ext.create('Egis.data.SecureProxy',{ table:'BkClient'}),
	fields : [
	{name: 'id', type: 'int', allowNull: false},
	{name: 'nom', type: 'string', allowNull: false}
]
});
