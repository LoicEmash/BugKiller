Ext.define('Books.view.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookpanel',
    border: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    dockedItems: [
        {
            xtype: 'bookheader'
        },
        {
            xtype: 'booksidebar'
        }
    ],
    
    items: [
        {
            xtype: 'bookview'
        },
        {
            xtype: 'reviewlist'
        }
    ]
});
