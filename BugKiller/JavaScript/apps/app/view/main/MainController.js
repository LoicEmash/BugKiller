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
        'BugKiller.Global'
    ],

    alias: 'controller.main',
    onAuthenticated : function(userMail,userPassword,userName,userId,isAdmin)
    {
        var loginForm = this.lookupReference('loginForm');
        var dashboardPanel  = this.lookupReference('dashboardPanel');
        BugKiller.Global.userMail = userMail;
        BugKiller.Global.userPassword = userPassword;
        BugKiller.Global.userId = userId;
        BugKiller.Global.userIsAdmin = isAdmin;
        console.log("BugKiller.Global.userIsAdmin : "+BugKiller.Global.userIsAdmin);
        var now = new Date();
        var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
        Ext.util.Cookies.set('BugKiller.Global.userMail',userMail,expiry);
        Ext.util.Cookies.set('BugKiller.Global.userPassword',userPassword,expiry);
        loginForm.hide();
        var dashBoardTitle = 'Tableau de bord BugKiller : '+userName;       
        dashboardPanel.setTitle(dashBoardTitle);
        dashboardPanel.show();        
        BugKiller.getApplication().fireEvent('userLogged');
        
    }

    
});
