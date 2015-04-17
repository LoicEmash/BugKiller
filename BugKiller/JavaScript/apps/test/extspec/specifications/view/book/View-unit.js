/// <reference path="../../../libraries/jasmine/jasmine.js" />
/// <reference path="../../../libraries/extspec/ExtSpec.js" />
/// <reference path="View-fakes.js" />
/// <reference path="../../../app/view/book/View.js" />
/*globals describe, it, expect, beforeEach, spyOn, jasmine, ExtSpec*/

describe('Books.view.book.View', function () {
    'use strict';

    var instance,
        esj = ExtSpec.Jasmine;

    beforeEach(function () {
        instance = ExtSpec.create('Books.view.book.View');
    });

    describe('bind', function () {
        var record,
            child;

        beforeEach(function () {
            record = esj.createSpyObject([
                {
                    name: 'get',
                    value: 'nothankyou.jpg'
                },
                {
                    name: 'getData',
                    value: 'data'
                }
            ]);

            esj.spyOnObject(instance, [{
                name: 'child',
                value: ['setSrc', 'update']
            }]);

            child = esj.getSpyReturn(instance, 'child');
        });

        it('should set the book image from the record', function () {
            instance.bind(record);

            expect(instance.child).toHaveBeenCalledWith('#imgCt');
            expect(record.get).toHaveBeenCalledWith('image');
            expect(child.setSrc).toHaveBeenCalledWith('nothankyou.jpg');
        });

        it('should update the book content from the record', function () {
            instance.bind(record);

            expect(instance.child).toHaveBeenCalledWith('#contentCt');
            expect(record.getData).toHaveBeenCalled();
            expect(child.update).toHaveBeenCalledWith('data');
        });
    });
});