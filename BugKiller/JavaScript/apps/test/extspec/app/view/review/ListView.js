/**
 * A view which displays a list of reviews for a specified book.
 * @extends Ext.view.View
 */
Ext.define('Books.view.review.ListView', {
    alias: 'widget.reviewlistview',
    extend: 'Ext.view.View',
    border: false,
    cls: 'review-list',

    autoScroll: true,

    store: 'Books.store.Review',
    itemSelector: '.review',
    tpl: [
        '<tpl for=".">',
            '<div class="review {[xindex === 1 ? "first-review" : ""]}">',
                '<div class="title">{title} {[this.stars(values)]}</div>',
                '<div class="author">By <span>{author}</span> - {date}</div>',
                '<div class="comment">{comment}</div>',
            '</div>',
        '</tpl>',
        {
            stars: function(values) {
                var res = [],
                    extension = Ext.isIE6 ? 'gif' : 'png',
                    i = 0;

                //print out the stars for each of the ratings
                for (; i < values.rating; i++) {
                    res.push('<img src="./resources/images/star.', extension, '" />');
                }

                //print out transparent stars for the rest (up to 5)
                while (i < 5) {
                    res.push('<img src="./resources/images/star_no.', extension, '" />');
                    i++;
                }

                return res.join('');
            }
        }
    ]
});
