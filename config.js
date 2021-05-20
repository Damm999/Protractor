/**
 * Configuration File
 */

// Initilizing Jasmine Reporter
var HtmlReporter = require('protractor-beautiful-reporter');
var originalJasmine2MetaDataBuilder = new HtmlReporter({'baseDirectory': './'})["jasmine2MetaDataBuilder"];


exports.config = {
	// The address of a running selenium server.
	seleniumAddress: 'http://localhost:4444/wd/hub',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
		      args: ['--headless','--disable-gpu']
    		}
	},


	// Spec patterns are relative to the configuration file location passed
	// to protractor (in this example conf.js).
	// They may include glob patterns.
	specs: ['TestScripts/**.js'],
	

	// Onprepare funciton to set things globally
	onPrepare: function() {
		
		browser.driver.manage().window().maximize();
		
		// Beautiful reporter
		jasmine.getEnv().addReporter(new HtmlReporter({
			baseDirectory: 'target/beautiful-reports',
			screenshotsSubfolder: 'images',
			jsonsSubfolder: 'jsons',
			jasmine2MetaDataBuilder: function (spec, descriptions, results, capabilities) {
				//filter for pendings with pending() function and "unfail" them
				if (results && results.failedExpectations && results.failedExpectations.length>0 && "Failed: => marked Pending" === results.failedExpectations[0].message) {
					results.pendingReason = "Marked Pending with pending()";
					results.status = "pending";
					results.failedExpectations = [];
				}
				//call the original method after my own mods
				return originalJasmine2MetaDataBuilder(spec, descriptions, results, capabilities);
			},
		 }).getJasmine2Reporter());
	},
	

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true, // Use colors in the command line report.
	},
	
};
