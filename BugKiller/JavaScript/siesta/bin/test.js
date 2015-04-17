console.log('Create page ...');
var page = require('webpage').create();
console.log('Open page http://127.0.0.1/JavaScript/apps/test/siesta/index.html');
page.open('http://127.0.0.1/JavaScript/apps/test/siesta/index.html', function(status) {
  console.log("Status: " + status);
	if (status !== 'success') 
	{
		console.log('FAIL to load the address');
		phantom.exit();
	} 
	else 
	{
		console.log('Page Loaded ');
		page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
			var title = page.evaluate(function() {
				return document.title;
			});
			console.log('Page title is ' + title);
			var bt = page.evaluate(function() {
				var bt = $(".run-all");
				console.log(bt);
				bt.click();
				return bt;
			});
			console.log(bt);
			phantom.exit()
		});
		
	}
	
  });



/*


});
*/