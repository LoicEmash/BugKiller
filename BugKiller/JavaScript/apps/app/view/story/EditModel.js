Ext.define('BugKiller.view.story.EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.story-edit',
    requires:['BugKiller.model.Thumb'],
    data: {
        storyId: null,
        postContent:null,        
        postState:null,
        storyTitle:null,
        storyProduct: null,
        storyApplication: null,
        storySeverity: 'minor',
        storyPriority: 'minor',
        storyReproductibility: 'yes'
    }
    

});
