/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('BugKiller.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'BugKiller.Global',
        'BugKiller.util.Redmine'
    ],
    alias: 'controller.main',
    init: function ()
    {
        var me = this;
        BugKiller.getApplication().on('userUnlogged', function(){
            me.showLogin.call(me);
            me.clearCookies();
            location.reload();
        });

    },
    clearCookies: function (userMail, userPassword)
    {
        var now = new Date();
        var expiry = new Date(now.getTime() + 10);
        Ext.util.Cookies.set('BugKiller.Global.userMail', null, expiry);
        Ext.util.Cookies.set('BugKiller.Global.userPassword', null, expiry);
    },
    showLogin: function ()
    {
        var loginForm = this.lookupReference('loginForm');
        var dashboardPanel = this.lookupReference('dashboardPanel');
        dashboardPanel.hide();
        loginForm.show();
    },
    onAuthenticated: function (userMail, userPassword, userName, userId, isAdmin, client)
    {
        BugKiller.Global.userMail = userMail;
        BugKiller.Global.userPassword = userPassword;
        BugKiller.Global.userId = userId;
        BugKiller.Global.userIsAdmin = isAdmin;
        BugKiller.Global.userClient = client;
        this.setCookies(userMail, userPassword);
        this.showDashboard(userName);
        BugKiller.util.Redmine.load(this.onRedmineLoadedSuccess, this.onRedmineLoadedFailure);

    },
    showDashboard: function (userName)
    {
        var loginForm = this.lookupReference('loginForm');
        var dashboardPanel = this.lookupReference('dashboardPanel');
        loginForm.hide();
        var dashBoardTitle = 'Tableau de bord BugKiller : ' + userName;
        dashboardPanel.setTitle(dashBoardTitle);
        dashboardPanel.show();
    },
    setCookies: function (userMail, userPassword)
    {
        var now = new Date();
        var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
        Ext.util.Cookies.set('BugKiller.Global.userMail', userMail, expiry);
        Ext.util.Cookies.set('BugKiller.Global.userPassword', userPassword, expiry);
    },
    onRedmineLoadedSuccess: function ()
    {
      //  console.log('onRedmineLoadedSuccess');
        var storeRedmineProduct = Ext.data.StoreManager.lookup('RedmineProduct');
        storeRedmineProduct.loadData(BugKiller.util.Redmine.allowedProducts);
        var storeRedmineRedmineApplication = Ext.data.StoreManager.lookup('RedmineApplication');
        storeRedmineRedmineApplication.loadData(BugKiller.util.Redmine.allowedApplications);
        BugKiller.getApplication().fireEvent('userLogged');
    },
    onRedmineLoadedFailure: function ()
    {
      //  console.log('onRedmineLoadedFailure');
    }


});
