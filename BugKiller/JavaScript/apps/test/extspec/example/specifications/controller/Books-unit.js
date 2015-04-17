/// <reference path="../../libraries/jasmine/jasmine.js" />
/// <reference path="../../libraries/extspec/ExtSpec.js" />
/// <reference path="../../app/controller/Books.js" />
/*globals describe, it, expect, beforeEach, spyOn, jasmine, ExtSpec*/

describe('Books.controller.Books', function () {
    'use strict';

    var instance,
        esj = ExtSpec.Jasmine;

    beforeEach(function () {
        jasmine.addMatchers(esj.Matchers);
        instance = ExtSpec.create('Books.controller.Books');
    });

    describe('init', function () {
        beforeEach(function () {
            instance.control = jasmine.createSpy('control');
            esj.createStoreSpy(instance, 'Books', ['on']);
            instance.init();
        });

        it('should control selection change on the sidebar', function () {
            expect(instance.control).toHaveControlled({
                selector: /sidebar/,
                event: 'selectionchange',
                listener: instance.onSideBarSelectionChange
            });
        });

        it('should listen for load on the Books store', function () {
            var store = esj.getSpyReturn(instance, 'getBooksStore');
            expect(instance.getBooksStore).toHaveBeenCalled();
            expect(store.on).toHaveAddedListener({
                event: 'load',
                listener: instance.onBooksStoreLoad
            });
        });
    });

    describe('onLaunch', function () {
        var ref;

        beforeEach(function () {
            esj.createStoreSpy(instance, 'Books').and.returnValue('BOOK STORE');
            esj.createRefSpy(instance, 'bookSideBar', ['bindStore']);
            ref = esj.getSpyReturn(instance, 'getBookSideBar');

            instance.onLaunch();
        });

        it('should bind sidebar to books store', function () {
            expect(instance.getBookSideBar).toHaveBeenCalled();
            expect(ref.bindStore).toHaveBeenCalledWith('BOOK STORE');
        });
    });

    describe('onSidebarSelectionChange', function () {
        beforeEach(function () {
            spyOn(instance, 'showBook');
        });

        it('should show book when records exist', function () {
            var records = ['record'];

            instance.onSideBarSelectionChange('view', records);

            expect(instance.showBook).toHaveBeenCalledWith('record');
        });

        it('should not show book when records are empty', function () {
            var records = [];

            instance.onSideBarSelectionChange('view', records);

            expect(instance.showBook).not.toHaveBeenCalled();
        });
    });

    describe('onBooksStoreLoad', function () {
        beforeEach(function () {
            Ext.defer = jasmine.createSpy('defer');

            instance.onBooksStoreLoad('store', 'records');
        });

        it('should defer load by half a second', function () {
            expect(Ext.defer).toHaveBeenCalledWith(instance.onBooksStoreDeferredLoad, 500, instance, ['records']);
        });
    });

    describe('onBooksStoreDeferredLoad', function () {
        var ref,
            selection;

        beforeEach(function () {
            esj.createRefSpy(instance, 'bookSideBar', [{
                name: 'getSelectionModel',
                value: ['select']
            }]);

            ref = esj.getSpyReturn(instance, 'getBookSideBar');
            selection = esj.getSpyReturn(ref, 'getSelectionModel');
        });

        it('should select the first item in the sidebar when records exist', function () {
            var records = ['record'];

            instance.onBooksStoreDeferredLoad(records);

            expect(instance.getBookSideBar).toHaveBeenCalled();
            expect(ref.getSelectionModel).toHaveBeenCalled();
            expect(selection.select).toHaveBeenCalledWith('record');
        });

        it('should not select an item in the sidebar when records are empty', function () {
            var records = [];

            instance.onBooksStoreDeferredLoad(records);

            expect(selection.select).not.toHaveBeenCalled();
        });
    });

    describe('showBook', function () {
        beforeEach(function () {
            esj.createRefSpy(instance, 'bookView', ['bind']);
            esj.createRefSpy(instance, 'reviewList', ['bind']);
            esj.createStoreSpy(instance, 'Reviews').and.returnValue('store');

            instance.showBook('book');
        });

        it('should show a book record in the book view', function () {
            var book = esj.getSpyReturn(instance, 'getBookView');

            expect(instance.getBookView).toHaveBeenCalled();
            expect(book.bind).toHaveBeenCalledWith('book');
        });

        it('should show a book record in the review list', function () {
            var reviewList = esj.getSpyReturn(instance, 'getReviewList');

            expect(instance.getReviewList).toHaveBeenCalled();
            expect(instance.getReviewsStore).toHaveBeenCalled();
            expect(reviewList.bind).toHaveBeenCalledWith('book', 'store');
        });
    });
});