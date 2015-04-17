var page = require('webpage').create();
page.open('http://127.0.0.1/JavaScript/apps/test/siesta/index.html', function(status) {
  console.log("Status: " + status);
 if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
  
    console.log('Loading ' + Date.now());
    
  }
  }
  phantom.exit();
});