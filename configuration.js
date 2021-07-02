exports.config = {
   //seleniumAddress: 'http://localhost:4444/wd/hub',
   
   getPageTimeout: 30000,
   directConnect: true,
    specs: ['Testcase/loginModule.js'],
    suites:{
  smoke:[]
    },
    capabilities: {
        browserName: 'chrome'
      },
    onPrepare: function() {
        browser.manage().window().maximize();
        browser. waitForAngularEnabled(false);
        browser.manage().timeouts().implicitlyWait(30000);
        
        // Getting CLI report
      const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
      jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    //Getting XML report
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
       consolidateAll: true,
       filePrefix: 'guitest-xmloutput',
       savePath: '.'
    }));

    //Getting screenshots
  var fs = require('fs-extra');
  fs.emptyDir('screenshots/', function (err) {
           console.log(err);
       });
       jasmine.getEnv().addReporter({
           specDone: function(result) {
               if (result.status == 'failed' ||result.status == 'passed') {
                   browser.getCapabilities().then(function (caps) {
                       var browserName = caps.get('browserName');
                       browser.takeScreenshot().then(function (png) {
                           var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                           stream.write(new Buffer.from(png, 'base64'));
                           stream.end();
                       });
                   });
               }
           }
       });
    },

    onComplete: function() {
        //Getting HTML report
        var browserName, browserVersion;
             var capsPromise = browser.getCapabilities();
             capsPromise.then(function (caps) {
                browserName = caps.get('browserName');
                browserVersion = caps.get('version');
                platform = caps.get('platform');
                var HTMLReport = require('protractor-html-reporter-2');
                testConfig = {
                    reportTitle: 'Protractor Test Execution Report',
                    outputPath: './',
                    outputFilename: 'ProtractorTestReport',
                    screenshotPath: './screenshots',
                    testBrowser: browserName,
                    browserVersion: browserVersion,
                    modifiedSuiteName: false,
                    screenshotsOnlyOnFailure: false,
                    testPlatform: platform
                };
                new HTMLReport().from('guitest-xmloutput.xml', testConfig);
            });
          },
          jasmineNodeOpts: {
         
            defaultTimeoutInterval: 3000000
            
        },
        allScriptsTimeout: 110000,
  };
  