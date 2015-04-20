StartTest(function (t) {
    t.diag("BugKiller :: util.Format");

    t.ok(Ext, 'Extjs est chargé');
    t.ok(BugKiller.util.Format, 'BugKiller.util.Format est chargé');
    t.isFunction(BugKiller.util.Format.keyValueRenderer, 'BugKiller.util.Format.keyValueRenderer est une fonction');
    
    t.throwsOk(function () {
        BugKiller.util.Format.keyValueRenderer();
    }, 
    "Le paramètre keyValues ne peut pas être undefined", "Un paramètre keyValues undefined leve une exception");
    
    t.throwsOk(function () {
         BugKiller.util.Format.keyValueRenderer(null);
    }, 
    "Le paramètre keyValues ne peut pas être null", "Un paramètre keyValues null leve une exception");
    
    t.throwsOk(function () {
        BugKiller.util.Format.keyValueRenderer(true);
    }, 
    "Le paramètre keyValues doit être un tableau", "Un paramètre keyValues non tableau leve une exception");
    
     
    t.done();   // Optional, marks the correct exit point from the test
});