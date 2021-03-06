Ext.define('BugKiller.util.Redmine', {
    requires: [
        'BugKiller.model.RedmineProject',
        'BugKiller.model.RedmineMembership',
        'BugKiller.model.RedmineGroup'
    ],
    singleton: true,
    projects: [],
    
    allowedProjects: [],
    allowedProducts: [],
    allowedApplications: [],
    memberships: [],
    /*
     * 
     * Configuration des client objet format : 
     * {
     *      name:'',
     *      replyDelay:8,
     *      executionDelay:10
     * }
     */
    clients : [],
    load: function (successCallback, failureCallback)
    {
        BugKiller.util.Redmine.projects = [];
        BugKiller.util.Redmine.memberships = [];
        BugKiller.util.Redmine.allowedProjects = [];
        BugKiller.util.Redmine.allowedProducts = [];
        BugKiller.util.Redmine.allowedApplications = [];
        BugKiller.util.Redmine.clients = [];
        BugKiller.util.Redmine.loadGroups(function () {
            //console.log('clients');
           // console.log(BugKiller.util.Redmine.clients);
            BugKiller.util.Redmine.loadProjects(function () {
                //console.log(BugKiller.util.Redmine.projects);
                BugKiller.util.Redmine.loadProjectMemberships(0, function () {
                    //console.log(BugKiller.util.Redmine.memberships);
                    BugKiller.util.Redmine.computeAllowedProject();
                    BugKiller.util.Redmine.computeAllowedProducts();
                    BugKiller.util.Redmine.computeAllowedApplications();
                    successCallback();
                    //console.log(BugKiller.util.Redmine.allowedProjects);
                    //console.log(BugKiller.util.Redmine.allowedProducts);
                    //console.log(BugKiller.util.Redmine.allowedApplications);
                }, failureCallback);
            }, failureCallback);
        }, failureCallback);




    },
    loadGroups: function (successCallback, failureCallback)
    {
      
       
       var clientStore = Ext.data.StoreManager.lookup('Client');
        clientStore.load({
            scope: this,
            callback: function (records, operation, success) {
                if (operation.wasSuccessful())
                {
                    for (var i = 0; i < records.length; i++)
                    {
                        var record = records[i];
                        BugKiller.util.Redmine.clients.push(record);
                        
                        
                    }
                    successCallback();
                }
                else
                {
                    failureCallback();
                }
            }
        });

    },
    computeAllowedApplications: function ()
    {
        for (var i = 0; i < BugKiller.util.Redmine.allowedProjects.length; i++)
        {
            var parent = BugKiller.util.Redmine.allowedProjects[i];
            var isParent = false;
            for (var j = 0; j < BugKiller.util.Redmine.allowedProjects.length; j++)
            {
                var child = BugKiller.util.Redmine.allowedProjects[j];
                if (child.data.parent !== undefined && child.data.parent !== null && child.data.parent.id === parent.get('id'))
                {
                    isParent = true;
                }
            }
            if (!isParent)
            {
                BugKiller.util.Redmine.allowedApplications.push(parent);
            }
        }
    },
    computeAllowedProducts: function ()
    {
        for (var i = 0; i < BugKiller.util.Redmine.allowedProjects.length; i++)
        {
            var parent = BugKiller.util.Redmine.allowedProjects[i];
            var isParent = false;
            for (var j = 0; j < BugKiller.util.Redmine.allowedProjects.length; j++)
            {
                var child = BugKiller.util.Redmine.allowedProjects[j];
                if (child.data.parent !== undefined && child.data.parent !== null && child.data.parent.id === parent.get('id'))
                {
                    isParent = true;
                }
            }
            if (isParent)
            {
                BugKiller.util.Redmine.allowedProducts.push(parent);
            }
        }


    },
    computeAllowedProject: function ()
    {
        for (var i = 0; i < BugKiller.util.Redmine.projects.length; i++)
        {
            var project = BugKiller.util.Redmine.projects[i];
            var isAllowedProject = false;
            var clients = [];
            for (var j = 0; j < BugKiller.util.Redmine.memberships.length; j++)
            {
                var membership = BugKiller.util.Redmine.memberships[j];
                if (membership.data.project.id === project.get('id'))
                {
                    for (var k = 0; k < membership.data.roles.length; k++)
                    {
                        var role = membership.data.roles[k];
                        if (role.name === 'Client')
                        {
                            isAllowedProject = true;
                            if (membership.data.group !== undefined)
                            {
                             //   console.log(membership.data.group);
                                clients.push(membership.data.group.name);
                            }
                        }
                    }
                }
            }
            if (isAllowedProject)
            {
                if (BugKiller.Global.userIsAdmin)
                {
                    BugKiller.util.Redmine.allowedProjects.push(project);
                }
                else
                {
                    if (Ext.Array.contains(clients, BugKiller.Global.userClient))
                    {
                        BugKiller.util.Redmine.allowedProjects.push(project);
                    }
                }

            }
        }

    },
    //@TODO : Gestion d'un sucess callback et d'un failure callback
    loadProjectMemberships: function (index, successCallback, failureCallback)
    {
        if (index < BugKiller.util.Redmine.projects.length)
        {
            var project = BugKiller.util.Redmine.projects[index];
            var projectMemebershipsStore = Ext.create('Ext.data.Store', {
                model: 'BugKiller.model.RedmineMembership',
                proxy: {
                    type: 'ajax',
                    url: document.egis.redmineUrl + '/projects/' + project.get('id') + '/memberships.json?key=' + document.egis.redmineKey,
                    reader: {
                        type: 'json',
                        rootProperty: 'memberships',
                        totalProperty: 'total_count'
                    }
                },
                autoLoad: false
            });
            projectMemebershipsStore.load({
                scope: this,
                callback: function (records, operation, success) {
                    if (operation.wasSuccessful())
                    {
                        for (var i = 0; i < records.length; i++)
                        {
                            BugKiller.util.Redmine.memberships.push(records[i]);
                        }
                        index++;
                        BugKiller.util.Redmine.loadProjectMemberships(index, successCallback, failureCallback);
                    }
                    else
                    {
                        failureCallback();
                    }
                }
            });


        }
        else
        {
            successCallback();
        }
    },
    loadProjects: function (successCallback, failureCallback)
    {
        var projectStore = Ext.create('Ext.data.Store', {
            model: 'BugKiller.model.RedmineProject',
            proxy: {
                type: 'ajax',
                url: document.egis.redmineUrl + '/projects.json?key=' + document.egis.redmineKey,
                reader: {
                    type: 'json',
                    rootProperty: 'projects',
                    totalProperty: 'total_count'
                }
            },
            autoLoad: false
        });

        BugKiller.util.Redmine.recurseLoadStore(projectStore, 0, 50, BugKiller.util.Redmine.projects, successCallback, failureCallback);
    },
    //@TODO : Gestion d'un sucess callback et d'un failure callback
    recurseLoadStore: function (store, offset, step, recordArray, successCallback, failureCallback)
    {

        store.load(
                {
                    params: {limit: step, offset: offset},
                    scope: this,
                    callback: function (records, operation, success) {
                        if (operation.wasSuccessful())
                        {
                            for (var i = 0; i < records.length; i++)
                            {
                                recordArray.push(records[i]);
                            }

                            if (records.length === step)
                            {
                                offset += step;
                                BugKiller.util.Redmine.recurseLoadStore(store, offset, step, recordArray, callback);
                            }
                            else
                            {
                                successCallback();
                            }
                        }
                        else
                        {
                            failureCallback();
                        }


                    }
                });
    }
});