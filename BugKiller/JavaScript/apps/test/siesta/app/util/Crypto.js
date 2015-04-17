StartTest(function (t) {
    t.diag("Sanity");

    t.ok(Ext, 'Extjs est chargé');
    t.ok(BugKiller.util.Crypto, 'BugKiller.util.Crypto est chargé');
    t.isFunction(BugKiller.util.Crypto.md5, 'BugKiller.util.Crypto.md5 est une fonction');
    
    t.throwsOk(function () {
        BugKiller.util.Crypto.md5();
    }, 
    "Le paramètre clearString ne peut pas être undefined", "Un paramètre clearString undefined leve une exception");
    
    t.throwsOk(function () {
        BugKiller.util.Crypto.md5(null);
    }, 
    "Le paramètre clearString ne peut pas être null", "Un paramètre clearString null leve une exception");
    
    t.throwsOk(function () {
        BugKiller.util.Crypto.md5(true);
    }, 
    "Le paramètre clearString doit être une chaine", "Un paramètre clearString non string leve une exception");
    
     t.throwsOk(function () {
        BugKiller.util.Crypto.md5("");
    }, 
    "Le paramètre clearString doit être une chaine de longueur minimum 1", "Un paramètre clearString string de longueur < 1 leve une exception");
    t.expect(BugKiller.util.Crypto.md5("gtk7gg")).toBe("70e92d4fbe843ce266bc6f1f2d643526");
    t.done();   // Optional, marks the correct exit point from the test
}) 