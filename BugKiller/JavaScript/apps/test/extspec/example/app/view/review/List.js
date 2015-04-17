/**
 * A view which displays a list of reviews for a specified book.
 * @extends Ext.view.View
 */
Ext.define('Books.view.review.List', {
    alias: 'widget.reviewlist',
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Card',
        'Books.view.review.ListView',
        'Books.view.Header'
    ],

    border: false,
    flex: 1,
    id: 'test',

    layout: 'card',

    dockedItems: [{
        xtype: 'bookheader',
        html: 'Reviews'
    }],

    items: [{
        xtype: 'reviewlistview',
        id: 'reviews',
        itemId: 'reviewsDataView'
    }],

    /**
     * Used to bind a store to this dataview.
     * Delegates to bindStore and also shows this view
     * @param {Ext.data.Model} record The record to bind
     * @param {Ext.data.Store} store The reviews store used by the application
     */
    bind: function (record, store) {
        //put the reviews into the store and bind the store to thie dataview
        this.getComponent('reviewsDataView').bindStore(record.reviews());
    }
});
