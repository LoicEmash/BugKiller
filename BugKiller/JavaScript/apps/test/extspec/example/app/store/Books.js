/**
 * The store used for books
 */
Ext.define('Books.store.Books', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.JsonP'],
    model: 'Books.model.Book',
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: 'resources/json/products.js'
    }
});