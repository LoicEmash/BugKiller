
Ext.define("BugKiller.view.post.List", {
    extend: "Ext.panel.Panel",
    scrollable: true,
    config: {
        storyId: null
    },
    xtype: "post-list",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    addPanelPost: function (postRecord)
    {

        

      
        var postTitle = Ext.Date.format(postRecord.get('dc'), 'd/m/Y H:i') + ' : ' + postRecord.getBkUser().get('name') + ' ' + BugKiller.Locale.stateValues[postRecord.get('state')];
        var postContent = postRecord.get('content');
        var panelPost = Ext.create('Ext.panel.Panel', {
            margin: 8,
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'label',
                    flex: 1,
                    margin: 4,
                    text: postTitle,
                    style:{
                        'font-weight':'bold'
                    }
                },
                {
                    xtype: 'label',
                    flex: 1,
                    margin: 8,
                    style: {
                        'vertical-align': 'top'
                    },
                    text: postContent
                }
            ]
        });
        this.add(panelPost);
    },
    clearPostList : function()
    {
         this.removeAll();
    },
    setStoryId: function (storyId)
    {
        var me = this;
        me.mask('Chargement ...');
       
        this.removeAll();
        var postStore = Ext.data.StoreManager.lookup('Post');
        postStore.clearFilter(true);
        postStore.addFilter({
            property: 'bkStoryId',
            value: storyId
        }, true);
        
        postStore.load({
            scope: this,
            callback: function (records, operation, success)
            {
                if (operation.wasSuccessful())
                {
                    for (var i = 0; i < records.length; i++)
                    {
                        var record = records[i];
                        me.addPanelPost(record);
                    }
                }
                me.unmask();
            }});

    }


});
