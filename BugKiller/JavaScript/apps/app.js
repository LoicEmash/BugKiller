/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.Ajax.useDefaultXhrHeader = false;
Ext.Ajax.cors = true;
Ext.String.isDefined = function (value)
{
    return (value !== undefined && value !== null && value !== '');
};
Ext.application({
    name: 'BugKiller',
    extend: 'BugKiller.Application',
    requires: ['BugKiller.model.BkRepository', 'Egis.data.SecureProxy'],
    autoCreateViewport: 'BugKiller.view.main.Main'

            //-------------------------------------------------------------------------
            // Most customizations should be made to BugKiller.Application. If you need to
            // customize this file, doing so below this section reduces the likelihood
            // of merge conflicts when upgrading to new versions of Sencha Cmd.
            //-------------------------------------------------------------------------
});


