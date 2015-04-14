//@charset UTF-8
Ext.define('Egis.data.SecureProxy', {
    xtype: 'secureproxy',
    extend: 'Ext.data.proxy.Rest',
    webServiceBaseUrl: '',
    appendId: true,
    config: {
        table: null,
        useLimit: false
    },
    constructor: function(config) {
        this.setUrl(document.egis.webServiceBaseUrl + '/Data/' + config.table);
        if (config.useLimit === undefined) {
            config.useLimit = false;
        }
        if (config.useLimit === true) {
            this.setPageParam('page');
            this.setStartParam('start');
            this.setLimitParam('limit');
        } else {
            this.setPageParam(false);
            this.setStartParam(false);
            this.setLimitParam(false);
        }
        this.callParent([
            config
        ]);
    },
    pageParam: false,
    startParam: false,
    limitParam: false,
    pageSize: 100,
    noCache: false,
    appendId: false,
    batchActions: true,
    reader: {
        type: 'json',
        rootProperty: 'datas',
        dateFormat: 'd/m/Y H:i:s',
        messageProperty: 'message',
        successProperty: 'success',
        totalProperty: 'total'
    },
    writer: {
        type: 'json',
        dateFormat: 'd/m/Y H:i:s',
        writeAllFields: true
    }
});

