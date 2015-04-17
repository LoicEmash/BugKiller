/// <reference path="../../../libraries/jasmine/jasmine.js" />
/// <reference path="../../../libraries/extspec/ExtSpec.js" />
/// <reference path="../../../app/view/review/List.js" />
/*globals describe, it, expect, beforeEach, spyOn, jasmine, ExtSpec*/

describe('Books.view.review.List', function () {
    'use strict';

    var instance,
        esj = ExtSpec.Jasmine;

    beforeEach(function () {
        instance = ExtSpec.create('Books.view.review.List');
    });

    describe('bind', function () {
        beforeEach(function () {
            esj.spyOnObject(instance, [{
                name: 'getComponent',
                value: ['bindStore']
            }]);
        });

        it('should bind the reviews list to the data view', function () {
            var component = esj.getSpyReturn(instance, 'getComponent'),
                record = esj.createSpyObject([{
                    name: 'reviews',
                    value: 'review list'
                }]);

            instance.bind(record);

            expect(instance.getComponent).toHaveBeenCalledWith('reviewsDataView');
            expect(record.reviews).toHaveBeenCalled();
            expect(component.bindStore).toHaveBeenCalledWith('review list');
        });
    });
});