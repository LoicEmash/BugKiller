Ext.define('BugKiller.model.BkPost', {
extend: 'BugKiller.model.BkBase',
requires : ['BugKiller.model.BkBase','Egis.data.SecureProxy','BugKiller.model.BkUser','BugKiller.model.BkStory'],
	proxy: Ext.create('Egis.data.SecureProxy',{ table:'BkPost'}),
	fields : [
	{name: 'id', type: 'int', allowNull: false},
	{name: 'bkUserId', type: 'int', allowNull: false, reference:  'BkUser'},
	{name: 'bkStoryId', type: 'int', allowNull: false, reference:  'BkStory'},
	{name: 'content', type: 'string', allowNull: false},
	{name: 'dc', type: 'date', allowNull: false, dateFormat:'d/m/Y H:i:s'},
	{name: 'state', type: 'string', allowNull: false}
]
});
