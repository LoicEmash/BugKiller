describe('BugKiller.util.Crypto', function () {

    describe('md5() method', function () {

        it('should be a function', function () {
            expect(typeof BugKiller.util.Crypto.md5).toEqual('function');
        });
        
        it("should throw an exception for undefined clearString parameter", function () {
             expect( function(){BugKiller.util.Crypto.md5()}).toThrow("Le paramètre clearString ne peut pas être undefined");
        });
        it("should throw an exception for null clearString parameter", function () {
             expect( function(){BugKiller.util.Crypto.md5(null)}).toThrow("Le paramètre clearString ne peut pas être null");
        });
        
        it("should throw an exception for non string clearString parameter", function () {
             expect( function(){BugKiller.util.Crypto.md5(true)}).toThrow("Le paramètre clearString doit être une chaine");
        });
        
        it("should throw an exception for empty string clearString parameter", function () {
             expect( function(){BugKiller.util.Crypto.md5("")}).toThrow("Le paramètre clearString doit être une chaine de longueur minimum 1");
        });
        
        it('should return 70e92d4fbe843ce266bc6f1f2d643526 for gtk7gg input', function () {
            expect(BugKiller.util.Crypto.md5("gtk7gg")).toEqual('70e92d4fbe843ce266bc6f1f2d643526');
        });
    });



});