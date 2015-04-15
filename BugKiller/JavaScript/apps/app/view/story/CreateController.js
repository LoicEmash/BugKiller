Ext.define('BugKiller.view.story.CreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.story-create',
    requires: [
        'BugKiller.util.Model'

    ],
    onCancelButtonClick: function ()
    {
        this.deleteFirstPostFiles();


    },
    deleteFirstPostFiles: function ()
    {
        var me = this;
        var fileList = this.lookupReference('fileList');
        if (fileList.getFileIds().length > 0)
        {
            me.getView().mask("supression des fichiers ...");
            var fileStore = Ext.create('Ext.data.Store', {model: 'BugKiller.model.BkFio', remoteFilter: true, remoteSort: true});
            fileStore.addFilter({
                operator: 'in',
                property: 'id',
                value: fileList.getFileIds()
            }, true);
            fileStore.load({
                scope: this,
                callback: function (fileRecords, operation) {
                    if (operation.wasSuccessful()) {

                        BugKiller.util.Model.chainErase(fileRecords, function () {
                            me.clearViewModel();
                            me.fireViewEvent('storyCreationCancel');
                        });
                    }
                    me.getView().unmask();
                }
            });
        }
        else
        {
            me.clearViewModel();
            me.fireViewEvent('storyCreationCancel');
        }

    },
    updateFirstPostFiles: function (storyId)
    {
        var me = this;
       // console.log('updateFirstPostFiles');
        var fileList = this.lookupReference('fileList');
        var fileIds = fileList.getFileIds();
       // console.log(fileIds);
        if (fileIds.length > 0)
        {
         //   console.log('updateFirstPostFiles '+fileIds.length+" fichiers");
            me.getView().mask('Enregistrement des fichiers ...');
           
            var fileStore = Ext.create('Ext.data.Store', {model: 'BugKiller.model.BkFio', remoteFilter: true, remoteSort: true});
            fileStore.addFilter({
                operator: 'in',
                property: 'id',
                value: fileIds
            }, true);
            fileStore.load({
                scope: this,
                callback: function (fileRecords, operation) {
                    if (operation.wasSuccessful()) {
                        var updatedRecords = [];
                        for (var i = 0; i < fileRecords.length; i++)
                        {
                            fileRecords[i].set('bkStoryId', storyId);
                            updatedRecords.push(fileRecords[i]);
                        }
                        BugKiller.util.Model.chainSave(updatedRecords, function () {
                            me.clearViewModel.call(me);
                            me.fireViewEvent('storyCreationSuccess');
                            me.getView().unmask();
                        });
                    }
                }
            });
        }
        else
        {
         //  console.log('updateFirstPostFiles aucun fichiers');
            me.clearViewModel.call(me);
            me.fireViewEvent('storyCreationSuccess');
            me.getView().unmask();
        }

    },
    saveFirstPost: function (storyId)
    {
       // console.log('saveFirstPost');
        var me = this;
        me.getView().mask('Enregistrement description ...');
        var viewModel = this.getViewModel();
        var post = Ext.create('BugKiller.model.BkPost');
        post.set('bkUserId', BugKiller.Global.userId);
        post.set('bkStoryId', storyId);
        post.set('content', viewModel.data.firstPostContent);
        post.set('dc', new Date());
        post.set('state', 'open');
        post.save({
            callback: function (recordPost, operation) {
                if (operation.wasSuccessful()) {
                    me.getView().unmask();                   
                    me.updateFirstPostFiles.call(me, storyId)
                }
            }

        });
    },
    saveStory: function ()
    {
       // console.log('saveStory');
        var me = this;
        var viewModel = this.getViewModel();
       
        me.getView().mask('Enregistrement rapport ...');
        var story = Ext.create('BugKiller.model.BkStory');
        story.set('bkUserId', BugKiller.Global.userId);
        story.set('prod', viewModel.data.storyProduct);
        story.set('app', viewModel.data.storyApplication);
        story.set('sev', viewModel.data.storySeverity);
        story.set('prio', viewModel.data.storyPriority);
        story.set('repro', viewModel.data.storyReproductibility);
        story.set('title', viewModel.data.storyTitle);
        story.set('dc', new Date());
        story.save({
            callback: function (recordStory, operation) {
                if (operation.wasSuccessful()) {
                    me.getView().unmask();
                    var storyId = recordStory.get('id');
                    me.saveFirstPost.call(me, storyId);
                }
            }

        });
    },
    onOkButtonClick: function ()
    {
        this.saveStory();

    },
    clearViewModel: function ()
    {
        var fileList = this.lookupReference('fileList');
        fileList.clearFiles();
        var viewModel = this.getViewModel();
        viewModel.set('storyProduct', null);
        viewModel.set('storyApplication', null);
        viewModel.set('storySeverity', 'minor');
        viewModel.set('storyPriority', 'minor');
        viewModel.set('storyReproductibility', 'yes');
        viewModel.set('storyTitle', null);

    }
});
