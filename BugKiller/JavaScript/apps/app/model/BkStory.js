Ext.define('BugKiller.model.BkStory', {
extend: 'BugKiller.model.BkBase',
requires : ['BugKiller.model.BkBase','Egis.data.SecureProxy','BugKiller.model.BkUser'],
	proxy: Ext.create('Egis.data.SecureProxy',{ table:'BkStory'}),
	fields : [
	{name: 'id', type: 'int', allowNull: false},
	{name: 'bkUserId', type: 'int', allowNull: false, reference:  'BkUser'},
	{name: 'prod', type: 'string', allowNull: false},
	{name: 'app', type: 'string', allowNull: false},
	{name: 'sev', type: 'string', allowNull: false},
	{name: 'prio', type: 'string', allowNull: false},
	{name: 'repro', type: 'string', allowNull: false},
	{name: 'dc', type: 'date', allowNull: false, dateFormat:'d/m/Y H:i:s'},
	{name: 'title', type: 'string', allowNull: false}
]
});
