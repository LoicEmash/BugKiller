var fs=require("fs"),isWindows=/^win/i.test(navigator.platform),noColor=!1,ARGV=require("system").args,binDir=isWindows?ARGV[1].replace(/.$/,""):ARGV[1]+"/";phantom.injectJs(binDir+"launcher-common.js");
var safePrint=function(a){noColor&&(a=a.replace(/\x1B\[\d+m([\s\S]*?)\x1B\[\d+m/g,"$1"));console.log(a)},isDebug=!1,debug=function(a){isDebug&&safePrint(a)},quit=function(a){phantom.exit(a||0)},safeExit=function(a){setTimeout(function(){phantom.exit(a||0)},0)},convertPath=function(a){return a},readFile=function(a){return fs.read(a)},args=processArguments(ARGV),options=args.options;
if(options.version){var siestaAll=fs.read(binDir+"../siesta-all.js"),match=/^\/\*[\s\S]*?Siesta (\d.+)\n/.exec(siestaAll);console.log("PhantomJS : "+phantom.version.major+"."+phantom.version.minor+"."+phantom.version.patch);match&&console.log("Siesta    : "+match[1]);phantom.exit(8)}
if(2==args.argv.length||options.help)console.log('Usage: phantomjs url [OPTIONS]\nThe `url` should point to your `tests/index.html` file\n\nOptions (all are optional):\n--help                     - prints this help message\n--version                  - prints versions of Siesta and PhantomJS\n\n--include regexp           - a regexp to only include the matching urls of tests\n                             this option has an deprecated alias: filter\n--exclude regexp           - a regexp to exclude the matching urls, takes precedence over `include`\n--previous-coverage-report - specifies the location of the previous coverage report, which will be\n                             combined with the current session. It must be generated in the "raw" format.\n                             Can be a file name or directory name, in the latter case\n                             file name is assumed to be "raw_coverage_data.json"\n--coverage-report-format   - specifies the format of the code coverage report, recognized\n                             values are `html`, `lcov` or `raw`.\n                             If provided, will enable the code coverage information collection.\n                             This option can be repeated several times, resulting in several reports\n                             saved in the same directory. Alternatively, several formats can be\n                             concatenated with "," or "+": --coverage-report-format=html+raw\n--coverage-report-dir      - specifies the output directory for the code coverage report\n                             default value is "./coverage/"\n--coverage-unit            - sets the "coverageUnit" harness config option,\n                             recognized values are: "file" and "extjs_class"\n--coverage-no-source       - if specified, the source code files will not be included in the coverage report.\n                             Currently only supported for html report\n--verbose                  - enable the output from all assertions (not only from failed ones)\n--debug                    - enable diagnostic messages\n--report-format            - create a report after the test suite execution\n                             recognizable formats are: "JSON, JUnit"\n--report-file              - required when `report-format` is provided. \n                             Specifies the file to save the report to.\n--width                    - width of the viewport, in pixels\n--height                   - height of the viewport, in pixels\n--no-color                 - disable the coloring of the output\n--pause                    - pause between individual tests, in milliseconds\n--page-pause               - pause between tests pages, in milliseconds, default value is 3000\n--page-size                - the number of tests, after which the browser will be restarted, default value is 10\n--teamcity                 - enables the special additional output during test suite execution, that allows\n                             TeamCity to generate realtime progress information\n--team-city                - synonym for --teamcity\n--jenkins                  - forces launcher to always exit with 0 exit code (otherwise Jenkins thinks build has failed\n                             and will not try to create a report)\n'),phantom.exit(6);
var harnessURL=args.argv[2],reportFormat=options["report-format"],reportFile=options["report-file"],isDebug=options.debug||!1,noColor=options["no-color"]||isWindows,isJenkins=options.jenkins;reportFormat&&("JSON"!=reportFormat&&"JUnit"!=reportFormat)&&(console.log("Unrecognized report format: "+reportFormat),phantom.exit(6));reportFormat&&!reportFile&&(console.log("`report-file` option is required, when `report-format` option is specified"),phantom.exit(6));
reportFile&&!reportFormat&&(reportFormat="JSON");var coverageOptions=processCoverageOptions(options);console.log("Launching PhantomJS "+phantom.version.major+"."+phantom.version.minor+"."+phantom.version.patch+" at "+constructURL(harnessURL,{}));
var runPage=function(a,d,f){a.setWindowSize(d.viewportWidth,d.viewportHeight);a.debug("Opening harness page: "+d.url);var e;a.onPageExit=function(){clearInterval(e);var d=a.exitCode;a.close();f({exitCode:d,pageCount:a.pageCount,summaryMessage:a.summaryMessage,combinedReport:a.combinedReport,htmlReport:a.htmlReport,lcovReport:a.lcovReport,rawReport:a.rawReport})};a.pageParams=d;a.shared=d.shared;a.open(d.url,function(){a.onActivityDetected();a.debug("Page opened successfully: "+d.url);e=setInterval(function(){18E4<
new Date-a.lastActivity&&(safePrint("TIMEOUT: Exit after 3 minutes of inactivity"),phantom.exit(2))},1E4)})},getProceduralInterface=function(a){var d,f,e,h,c={exitCode:null,lastActivity:new Date,pageCount:null,summaryMessage:null,htmlReport:null,lcovReport:null,rawReport:null,pageReports:[],combinedReport:null,browserName:"PhantomJS",debug:function(b){debug(b)},print:function(b){safePrint(b)},onActivityDetected:function(){this.lastActivity=new Date},open:function(b,g){d=new WebPage({settings:{localToRemoteUrlAccessEnabled:!0},
viewportSize:{width:f,height:e},onResourceReceived:function(a){a.url===b&&400<a.status&&(console.log("Failed to load URL: "+b+"(status: "+a.status+")"),phantom.exit(5))},onInitialized:function(){d.evaluate(function(a,b,c,g,d){__PAGE_REPORTS__=a;__REPORT_OPTIONS__=b;__CONTENT_MANAGER_STATE__=c;__PREV_COVERAGE_INFO__=g;__COVERAGE_REPORT_FORMATS__=d},c.pageReports,a,c.shared.contentManagerState,c.shared.coverageInfo,coverageOptions.coverageReportFormats)},onConsoleMessage:function(a){var b;if(b=a.match(/^__PHANTOMJS__:([\s\S]*)/))if(a=
b[1],debug("Received command: "+a),b=a.match(/^exit:(\d+)/))c.exitCode=Number(b[1]),c.onPageExit();else if(b=a.match(/^pageCount:(\d+)/))c.pageCount=Number(b[1]);else if(b=a.match(/^pageReport:([\s\S]*)/))c.pageReports.push(JSON.parse(b[1]));else if(b=a.match(/^summaryMessage:([\s\S]*)/))c.summaryMessage=String(b[1]);else if(b=a.match(/^combinedReport:([\s\S]*)/))c.combinedReport=String(b[1]);else if(a.match(/^keepAlive/))c.onActivityDetected();else if(b=a.match(/^log:([\s\S]+)/))safePrint(b[1]);
else if(b=a.match(/^contentManagerState:([\s\S]+)/))c.shared.contentManagerState=JSON.parse(b[1]);else if(b=a.match(/^coverageInfo:([\s\S]+)/))c.shared.coverageInfo=JSON.parse(b[1]);else if(b=a.match(/^htmlReport:([\s\S]+)/))c.htmlReport=JSON.parse(b[1]);else if(b=a.match(/^lcovReport:([\s\S]+)/))c.lcovReport=JSON.parse(b[1]);else if(b=a.match(/^rawReport:([\s\S]+)/))c.rawReport=JSON.parse(b[1]);else throw"Unknown phantomjs command: "+a;else console.log(a)}});var k=!0;d.open(b,function(a){k&&(k=!1,
"success"!==a&&(console.log("Failed to load the URL: "+b),phantom.exit(5)),h=setTimeout(function(){c.executeScript("var parent = window.opener || window.parent; return typeof Siesta == 'undefined' && (!parent || typeof parent.Siesta == 'undefined')")&&(console.log("[ERROR] Can't find Siesta on the harness page - page loading failed?"),c.close(),phantom.exit(5));c.executeScript("var parent = window.opener || window.parent; try { return typeof Siesta.Harness.Browser.Automation != 'undefined' } catch(e) { try { return typeof parent.Siesta.Harness.Browser.Automation != 'undefined' } catch(e) { return false } }")||
(console.log("[ERROR] The harness page you are targeting contains Siesta Lite distribution. To use automation facilities, \nmake sure harness page uses `siesta-all.js` from Standard or Trial packages"),c.close(),phantom.exit(5));coverageOptions.enableCodeCoverage&&"true"!=String(c.executeScript("var parent = window.opener || window.parent; try { return typeof IstanbulCollector != 'undefined' } catch(e) { try { return typeof parent.IstanbulCollector != 'undefined' } catch(e) { return false } } "))&&
(console.log("[ERROR] You've enabled code coverage, but harness page you are targeting does not contain required classes. Did you include `siesta-coverage-all.js` on the harness page?"),c.close(),phantom.exit(5));g&&g()},100))})},close:function(){clearTimeout(h);d&&(d.release(),d=null,c.lastActivity=null,c.exitCode=null)},setWindowSize:function(b,a){f=b;e=a},executeScript:function(b){b=eval("(function() {"+b+"})");return d.evaluate(b)},sleep:function(b,a){setTimeout(a,b)},saveReport:function(b){this.saveFile(a.file,
b,"w")},saveFile:function(a,c,d){fs.write(a,c,d||"w")},readFile:function(a,c){return"rb"==c?fs.open(a,"rb").read():readFile(a)},copyFile:function(a,c){this.saveFile(c,this.readFile(a,"rb"),"wb")},copyTree:function(a,c){try{fs.removeTree(c)}catch(d){}fs.copyTree(a,c)},saveHtmlCoverageReport:function(a,c){this.copyFile(binDir+"/coverage/index.html",a+"/index.html");this.copyFile(binDir+"/coverage/siesta-coverage-report.css",a+"/css/siesta-coverage-report.css");this.copyFile(binDir+"/coverage/siesta-coverage-report.js",
a+"/siesta-coverage-report.js");this.copyFile(binDir+"/../resources/images/leaf.png",a+"/images/leaf.png");this.copyFile(binDir+"/../resources/images/ns.png",a+"/images/ns.png");this.copyTree(binDir+"../resources/css/fonts",a+"/css/fonts");this.saveFile(a+"/coverage-data.json",JSON.stringify(c))},saveLcovCoverageReport:function(a,c){this.saveFile(a+"/lcov.info",c.lcovReport)},saveRawCoverageReport:function(a,c){this.saveFile(a+"/raw_coverage_data.json",JSON.stringify(c))}};return c},reportOptions=
reportFormat?{format:reportFormat,file:reportFile}:null,iface=getProceduralInterface(reportOptions);
runBrowser(iface,{harnessURL:harnessURL,query:{phantom:!0,verbose:options.verbose,include:options.include||options.filter,exclude:options.exclude,pause:options.pause,pageSize:options["page-size"],isTeamCity:options["team-city"]||options.teamcity,isJenkins:isJenkins,enableCodeCoverage:coverageOptions.enableCodeCoverage,coverageUnit:coverageOptions.coverageUnit,hasPreviousReport:Boolean(coverageOptions.previousCoverageReport),coverageNoSource:options["coverage-no-source"]},pagePause:options["page-pause"],
viewportWidth:options.width||1200,viewportHeight:options.height||800,reportOptions:reportOptions,enableCodeCoverage:coverageOptions.enableCodeCoverage,coverageReportDir:coverageOptions.coverageReportDir,coverageReportFormats:coverageOptions.coverageReportFormats,coverageUnit:coverageOptions.coverageUnit,previousCoverageReport:coverageOptions.previousCoverageReport},function(a){safeExit(isJenkins?0:a)});
