/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('Books.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'Books.view.Header',
        'Books.view.book.View',
        'Books.view.book.SideBar',
        'Books.view.review.List',
        'Books.view.Panel'
    ],

    items: [{
        xtype: 'bookpanel',
        id: 'viewport'
    }]
});