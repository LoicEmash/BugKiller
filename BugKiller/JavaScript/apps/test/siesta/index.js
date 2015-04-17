var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title       : 'Awesome Test Suite',

    preload     : [
        // version of ExtJS used by your application
        //'../../../ext/resources/css/ext-all.css',
        '../../app.css',

        // version of ExtJS used by your application
        '../../../ext/build/ext-all-debug.js',
        '../../app/util/Crypto.js'
        //'../yourproject-all.js'
    ]
});

Harness.start(
    'app/util/Crypto.js'
   // '020_basic.t.js'
);
