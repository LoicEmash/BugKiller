//@charset UTF-8
Ext.define('Egis.data.SecureProxy', {
    xtype: 'secureproxy',
    extend: 'Ext.data.proxy.Rest',
    webServiceBaseUrl: '',    
    config: {
        table: null,
        useLimit: false,
        // Table enfants dont les données doivent être ramené (on gère un seul niveau pour l'instant) séparé par des pipe
        needestChildTables:null,
        // Table parent dont les données doivent être ramené (on gère un seul niveau pour l'instant) séparé par des pipe
        needestParentTables:null
    },
    setNeedestChildTables : function(tables)
    {
        this.needestChildTables = tables;
        this.extraParams = {
            needestChildTables : this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
    },    
    setNeedestParentTables : function(tables)
    {
        this.needestParentTables = tables;
        this.extraParams = {
            needestChildTables : this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
    }   
    ,
    constructor: function (config) {
        this.setUrl(document.egis.webServiceBaseUrl + '/Data/' + config.table);


        if (config.useLimit === undefined)
        {
            config.useLimit = false;
        }
        else if (config.useLimit === true)
        {
            this.setPageParam('page');
            this.setStartParam('start');
            this.setLimitParam('limit');
        }
        else
        {
            this.setPageParam(false);
            this.setStartParam(false);
            this.setLimitParam(false);
        }
        if (config.needestChildTables !== undefined)
        {
            this.setNeedestChildTables(config.needestChildTables);
            console.log('setNeedestChildTables');
        }
        if (config.needestParentTables !== undefined)
        {
            this.setNeedestParentTables(config.needestParentTables);
            console.log('setNeedestParentTables');
        }
        this.extraParams = {
            needestChildTables : this.getNeedestChildTables(),
            needestParentTables: this.getNeedestParentTables()
        };
        console.log(this.extraParams);
        this.callParent([config]);
    },
    pageParam: false,
    startParam: false,
    limitParam: false,
    pageSize: 100,
    noCache: false,
    appendId: false,
    batchActions: true,
    reader:
            {
                type: 'json',
                rootProperty: 'datas',
                dateFormat:'d/m/Y H:i:s',
                messageProperty: 'message',
                successProperty: 'success',
                totalProperty: 'total'
            }
    ,
    writer:
            {
                type: 'json',
                dateFormat:'d/m/Y H:i:s',
                writeAllFields: true
            }

});
