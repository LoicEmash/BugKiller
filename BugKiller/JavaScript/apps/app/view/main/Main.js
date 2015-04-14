/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('BugKiller.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'BugKiller.view.main.MainController',
        'BugKiller.view.main.MainModel',
        'BugKiller.view.login.Login',
        'BugKiller.view.dashboard.Dashboard'
        
    ],
    xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'fit'
    },
    items: [
        {
            reference: 'loginForm',           
            xtype: 'login',
            listeners: {
                authenticated: 'onAuthenticated'
            }
        },
        {
            reference: 'dashboardPanel',
            xtype:'bugDashboard',           
            hidden:true
        }
    ]
});
