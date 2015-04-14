Ext.define('BugKiller.view.story.CreateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.story-create',
    requires:['BugKiller.model.Thumb'],
    data: {
        storyTitle:null,
        storyProduct: null,
        storyApplication: null,
        storySeverity: 'minor',
        storyPriority: 'minor',
        storyReproductibility: 'yes',
        firstPostContent: null
    }
});
