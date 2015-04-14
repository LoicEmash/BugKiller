Ext.define('BugKiller.model.BkFio', {
extend: 'BugKiller.model.BkBase',
requires : ['BugKiller.model.BkBase','Egis.data.SecureProxy','BugKiller.model.BkStory'],
	proxy: Ext.create('Egis.data.SecureProxy',{ table:'BkFio'}),
	fields : [
	{name: 'id', type: 'int', allowNull: false},
	{name: 'bkStoryId', type: 'int', allowNull: true, reference:  'BkStory'},
	{name: 'name', type: 'string', allowNull: false},
	{name: 'ext', type: 'string', allowNull: false},
	{name: 'content', type: 'string', allowNull: false}
]
});
