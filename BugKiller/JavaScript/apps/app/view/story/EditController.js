Ext.define('BugKiller.view.story.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.story-edit',
    storyId: null,
    onCancelButtonClick: function ()
    {

        this.deletePostFiles();

    },
    deletePostFiles: function ()
    {
        var me = this;
        var fileList = this.lookupReference('fileList');
        if (fileList.getFileIds().length > 0)
        {
            me.getView().mask('Suppression des fichiers ...');

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

                            me.fireViewEvent('storyEditingCancel');
                            me.getView().unmask();
                        });
                    }
                }
            });
        }
        else
        {
            me.fireViewEvent('storyEditingCancel');
        }


    },
    updatePostFiles: function (storyId, postId)
    {

        var me = this;
        me.getView().mask('Mise à jour des fichiers ...');
        var fileList = this.lookupReference('fileList');
        var postList = this.lookupReference('postList');
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
                    var updatedRecords = [];
                    for (var i = 0; i < fileRecords.length; i++)
                    {
                        fileRecords[i].set('bkStoryId', storyId);
                        updatedRecords.push(fileRecords[i]);
                    }

                    BugKiller.util.Model.chainSave(updatedRecords, function () {
                        postList.setStoryId(storyId);
                        fileList.clearFiles();
                        me.loadStoryThumb();
                        me.getView().unmask();
                    });
                }
                else
                {
                    me.getView().unmask();
                }
            }
        });
    },
    savePost: function ()
    {


        var me = this;
        me.getView().mask('Enregistrement ...');
        var viewModel = this.getViewModel();
        var storyId = viewModel.get('storyId');
        var content = viewModel.get('postContent');
        var state = viewModel.get('postState');
        var post = Ext.create('BugKiller.model.BkPost');
        post.set('bkUserId', BugKiller.Global.userId);
        post.set('bkStoryId', storyId);
        post.set('content', content);
        post.set('state', state);
        post.set('dc', new Date());
        post.save({
            callback: function (record, operation) {
                if (operation.wasSuccessful()) {
                    var postId = record.get('id');
                    me.updatePostFiles.call(me, storyId, postId);
                }
                else
                {
                    me.getView().unmask();
                }
            }});
    },
    onOkButtonClick: function ()
    {
        this.savePost();
    },
    clearViewModel: function ()
    {
       // console.log('clearViewModel');
        var postList = this.lookupReference('postList');
        var viewModel = this.getViewModel();
        viewModel.set('storyId', null);
        viewModel.set('postContent', '');
        viewModel.set('postState', '');

        viewModel.set('storyTitle', '');
        viewModel.set('storyProduct', '');
        viewModel.set('storyApplication', '');
        viewModel.set('storySeverity', '');
        viewModel.set('storyPriority', '');
        viewModel.set('storyReproductibility', '');

        var fileList = this.lookupReference('fileList');
        fileList.clearFiles();
        postList.clearPostList();
        fileList.doLayout();
        postList.doLayout();

    },
    loadStoryThumb: function ()
    {

        var me = this;
        var fileListStory = this.lookupReference('fileListStory');
        var thumbStore = fileListStory.getController().getViewModel().getStore('thumb');
        var thumbs = [];

        thumbStore.loadData(thumbs);
        me.story.bkFios().load({
            scope: this,
            callback: function (fileRecords, operation) {
                if (operation.wasSuccessful()) {
                    me.story.bkFios().each(function (rec)
                    {
                        thumbs.push(rec.data);
                    }
                    );
                    if (thumbs.length > 0)
                    {
                        fileListStory.expand();
                    }
                    else
                    {
                        fileListStory.collapse();
                    }
                    thumbStore.loadData(thumbs);
                }
            }
        });
    },
    loadStory: function (storyId, lastPostState)
    {
        this.clearViewModel();
        var me = this;
        var viewModel = this.getViewModel();
        var storyStore = Ext.data.StoreManager.lookup('Story');
        var comboState =this.lookupReference('comboState'); 
        var stateDatas = [];
        if (BugKiller.Global.userIsAdmin === true)
        {

            for (var i = 0; i < BugKiller.Global.workflow.admin[lastPostState].length; i++)
            {
                stateDatas.push({
                    value: BugKiller.Global.workflow.admin[lastPostState][i],
                    name: BugKiller.Locale.stateValues[BugKiller.Global.workflow.admin[lastPostState][i]]
                });
            }

        }
        else
        {
            for (var i = 0; i < BugKiller.Global.workflow.user[lastPostState].length; i++)
            {
                stateDatas.push({
                    value: BugKiller.Global.workflow.user[lastPostState][i],
                    name: BugKiller.Locale.stateValues[BugKiller.Global.workflow.user[lastPostState][i]]
                });
            }
            
        }
        comboState.getStore().loadData(stateDatas);
        storyStore.clearFilter(true);
        storyStore.addFilter({
            property: 'id',
            value: storyId
        }, true);
        storyStore.load({
            scope: this,
            callback: function (storyRecord, operation) {
                if (operation.wasSuccessful()) {
                    me.story = storyRecord[0];
                    viewModel.set('storyId', storyRecord[0].get('id'));
                    viewModel.set('storyProduct', storyRecord[0].get('prod'));
                    viewModel.set('storyApplication', storyRecord[0].get('app'));
                    viewModel.set('storySeverity', storyRecord[0].get('sev'));
                    viewModel.set('storyReproductibility', storyRecord[0].get('repro'));
                    viewModel.set('storyPriority', storyRecord[0].get('prio'));
                    viewModel.set('storyTitle', storyRecord[0].get('title'));
                    var postList = this.lookupReference('postList');
                    postList.setStoryId(storyRecord[0].get('id'));
                    var panelStory = this.lookupReference('panelStory');
                    panelStory.setTitle("Observation #" + storyRecord[0].get('id') + ' Raporteur ' + storyRecord[0].getBkUser().get('name'));
                    this.loadStoryThumb();

                }
            }
        });




    }
});
