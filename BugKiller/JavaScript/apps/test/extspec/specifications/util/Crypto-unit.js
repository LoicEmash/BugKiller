/// <reference path="../../libraries/jasmine/jasmine.js" />
/// <reference path="../../libraries/extspec/ExtSpec.js" />
/// <reference path="../../../app/util/Crypto.js" />
describe('BugKiller.util.Crypto', function () {
    'use strict';
    describe('md5', function () {

        var instance = ExtSpec.ClassManager.create('BugKiller.util.Crypto');
        it("should throw an exception for undefined clearString parameter", function () {
            expect(function () {
               instance.md5();
            }).toThrow("Le paramètre clearString ne peut pas être undefined");
        });
        it("should throw an exception for null clearString parameter", function () {
            expect(function () {
               instance.md5(null);
            }).toThrow("Le paramètre clearString ne peut pas être null");
        });
        
        it("should throw an exception for not string clearString parameter", function () {
            expect(function () {
               instance.md5(true);
            }).toThrow("Le paramètre clearString doit être une chaine");
        });
        
        it("should throw an exception for empty string clearString parameter", function () {
            expect(function () {
               instance.md5("");
            }).toThrow("Le paramètre clearString doit être une chaine de longueur minimum 1");
        });
        
        it("validate hash", function () {
            var hash = instance.md5("gtk7gg");
            expect(hash).toEqual("70e92d4fbe843ce266bc6f1f2d643526");
        });
    });
});