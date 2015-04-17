/// <reference path="../../../libraries/jasmine/jasmine.js" />
/// <reference path="../../../libraries/extspec/ExtSpec.js" />
/// <reference path="../../../app/view/review/ListView.js" />
/*globals describe, it, expect, beforeEach, spyOn, jasmine, ExtSpec*/

describe('Books.view.review.ListView', function () {
    'use strict';

    var instance,
        esj = ExtSpec.Jasmine;

    beforeEach(function () {
        instance = ExtSpec.create('Books.view.review.ListView');
    });

    describe('tpl', function () {
        var tpl;

        beforeEach(function () {
            tpl = ExtSpec.getTplConfig(instance);
        });

        describe('stars', function () {
            var stars;

            beforeEach(function () {
                stars = tpl.stars;
            });

            afterEach(function () {
                delete Ext.isIE6;
            });

            it('should return five png images with four stars given a rating of four', function () {
                var actual = stars({ rating: 4 });

                expect(actual).toBe('<img src="./resources/images/star.png" /><img src="./resources/images/star.png" /><img src="./resources/images/star.png" /><img src="./resources/images/star.png" /><img src="./resources/images/star_no.png" />');
            });

            it('should return five gif images with three stars given a rating of three in IE6', function () {
                Ext.isIE6 = true;

                var actual = stars({ rating: 3 });

                expect(actual).toBe('<img src="./resources/images/star.gif" /><img src="./resources/images/star.gif" /><img src="./resources/images/star.gif" /><img src="./resources/images/star_no.gif" /><img src="./resources/images/star_no.gif" />');
            });
        });
    });
});