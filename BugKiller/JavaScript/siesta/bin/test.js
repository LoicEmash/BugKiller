console.log('Create page ...');
var page = require('webpage').create();
console.log('Open page http://127.0.0.1/JavaScript/apps/test/siesta/index.html');
page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open('http://127.0.0.1/JavaScript/apps/test/siesta/index.html', function (status) {
    var contentChange = function()
    {
        console.log('contentChange');
    };
    console.log("Status: " + status);
    if (status !== 'success')
    {
        console.log('FAIL to load the address');
        phantom.exit();
    }
    else
    {
        var me = this;
        console.log('Page Loaded ');
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            var title = page.evaluate(function () {
                return document.title;
            });
           
            var btRunAllId = page.evaluate(function () {
                console.log('btRunAllId');
                var btRunAll = $(".run-all");     
                var divFail = $(".total-fail");
                var divPass = $(".total-pass");               
                divFail.bind( "contentchange", function(){
                    me.contentChange();
                    //console.log('divFail');
                });
                divPass.bind( "contentchange", function(){
                    me.contentChange();
                    //console.log('divPass');
                });
                btRunAll.click();
                return btRunAll.attr('id');
            });
            console.log(btRunAllId);
            setTimeout(function () {
                var totalFail = page.evaluate(function () {
                    var div = $(".total-fail");
                    return div.text();
                });
                var totalPass = page.evaluate(function () {
                    var div = $(".total-pass");
                    return div.text();
                });
                
                console.log('totalFail : ' + totalFail);
                console.log('totalPass : ' + totalPass);
                phantom.exit();
            }, 2000);

        });

    }

});



/*
 
 
 });
 */