Ext.define('BugKiller.model.BkVStory', {
extend: 'BugKiller.model.BkBase',
requires : ['BugKiller.model.BkBase','Egis.data.SecureProxy'],
	proxy: Ext.create('Egis.data.SecureProxy',{ table:'BkVStory'}),
	fields : [
	{name: 'id', type: 'int', allowNull: true},
	{name: 'bkUserId', type: 'int', allowNull: true},
	{name: 'bkStoryProd', type: 'string', allowNull: true},
	{name: 'bkStoryApp', type: 'string', allowNull: true},
	{name: 'bkStorySev', type: 'string', allowNull: true},
	{name: 'bkStoryPrio', type: 'string', allowNull: true},
	{name: 'bkStoryRepro', type: 'string', allowNull: true},
	{name: 'bkStoryDc', type: 'date', allowNull: true, dateFormat:'d/m/Y H:i:s'},
	{name: 'bkStoryTitle', type: 'string', allowNull: true},
	{name: 'bkPostState', type: 'string', allowNull: true},
	{name: 'bkPostDc', type: 'date', allowNull: true, dateFormat:'d/m/Y H:i:s'},
	{name: 'bkPostCount', type: 'int', allowNull: true},
	{name: 'bkFioCount', type: 'int', allowNull: true},
	{name: 'bkUserName', type: 'string', allowNull: true},
	{name: 'resolveDelay', type: 'int', allowNull: true},
	{name: 'replyDelay', type: 'int', allowNull: true}
]
});
