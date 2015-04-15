Ext.define('BugKiller.view.story.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.story-list',
    onGridCellDoubleClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {
        this.fireViewEvent('storyDoubleClick', record);
    }
    , initViewModel: function ()
    {
        var me = this;
        console.log('handle userLogged');
        BugKiller.getApplication().on('userLogged', function () {
            me.loadStory.call(me);

        });
        BugKiller.getApplication().on('userStoryChange', function () {
            me.loadStory.call(me);

        });
        var comboState = this.lookupReference('comboState');
        var stateDatas = [];
        for (var stateValue in BugKiller.Locale.stateValues) {
            if (BugKiller.Locale.stateValues.hasOwnProperty(stateValue)) {
                stateDatas.push({
                    name: BugKiller.Locale.stateValues[stateValue],
                    value: stateValue
                });

            }
        }
        comboState.getStore().loadData(stateDatas);
    },
    addFilter: function (storyStore)
    {


        var comboProduct = this.lookupReference('comboProduct');
        var filterProduct = comboProduct.getValue();
        console.log('filterProduct : ' + filterProduct);
        if (filterProduct !== null && filterProduct !== '')
        {
            storyStore.addFilter({
                property: 'bkStoryProd',
                operator: 'like',
                value: filterProduct
            }, true);
        }



        var comboApp = this.lookupReference('comboApp');
        var filterApp = comboApp.getValue();
        console.log('filterApp : ' + filterApp);
        if (filterApp !== null && filterApp !== '')
        {
            storyStore.addFilter({
                property: 'bkStoryApp',
                operator: 'like',
                value: filterApp
            }, true);
        }


        var comboState = this.lookupReference('comboState');
        var filterState = comboState.getValue();
        console.log('filterState : ' + filterState);
        if (filterState !== null && filterState !== '')
        {
            storyStore.addFilter({
                property: 'bkPostState',
                operator: 'like',
                value: filterState
            }, true);
        }

        var txtId = this.lookupReference('txtId');
        var filterId = txtId.getValue();
        if (filterId !== null && filterId !== '')
        {
            storyStore.addFilter({
                property: 'id',               
                value: filterId
            }, true);
        }
        
        
        var comboSeverity = this.lookupReference('comboSeverity');
        var filterSeverity = comboSeverity.getValue();       
        if (filterSeverity !== null && filterSeverity !== '')
        {
            storyStore.addFilter({
                property: 'bkStorySev',
                operator: 'like',
                value: filterSeverity
            }, true);
        }
        
        
        var comboPriority = this.lookupReference('comboPriority');
        var filterPriority = comboPriority.getValue();       
        if (filterPriority !== null && filterPriority !== '')
        {
            storyStore.addFilter({
                property: 'bkStoryPrio',
                operator: 'like',
                value: filterPriority
            }, true);
        }
        
        var comboReproductibility = this.lookupReference('comboReproductibility');
        var filterReproductibility = comboReproductibility.getValue();       
        if (filterReproductibility !== null && filterReproductibility !== '')
        {
            storyStore.addFilter({
                property: 'bkStoryRepro',
                operator: 'like',
                value: filterReproductibility
            }, true);
        }

    },
    loadStory: function ()
    {
        console.log("load story");
        var storyStore = Ext.data.StoreManager.lookup('VStory');
        storyStore.clearFilter(true);
        if (BugKiller.Global.userIsAdmin === false)
        {
            storyStore.addFilter({
                property: 'bkUserId',
                value: BugKiller.Global.userId
            }, true);
        }
        this.addFilter(storyStore);
        storyStore.load();
    },
    onComboProductChange: function (combo, newValue, oldValue, eOpts)
    {
        var store = Ext.data.StoreManager.lookup('RedmineApplication');
        store.clearFilter();
        store.addFilter(function (item)
        {


            if (item.data.parent !== undefined)
            {
                if (item.data.parent.name === newValue)
                {
                    return true;
                }
            }
            return false;
        });
        this.loadStory();
    },
    onComboFilterChange: function ()
    {
        this.loadStory();
    },
    onFilterKeyUp: function (combo, e, eOpts)
    {
        if (e.getCharCode() === 13)
        {
            this.loadStory();
        }

    }
   

});
