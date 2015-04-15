/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('BugKiller.Application', {
    extend: 'Ext.app.Application',
    name: 'BugKiller',
    requires : [
        'BugKiller.store.RedmineProduct',
        'BugKiller.store.RedmineApplication',,
        'BugKiller.store.RedmineUser',
        'BugKiller.store.Story',
        'BugKiller.store.Post',
        'BugKiller.store.Client'
    ],
    stores: [
        'RedmineProduct',
        'RedmineApplication',
        'RedmineUser',
        'VStory',
        'Story',
        'Post',
        'Client'
        // TODO: add global / shared stores here
    ],
    launch: function () {
        
        // TODO - Launch the application
    }
});
