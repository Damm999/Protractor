/**
 * Configuration File
 */

// Initilizing Jasmine Reporter
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');


exports.config = {
	// The address of a running selenium server.
	seleniumAddress: 'http://localhost:4444/wd/hub',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		browserName: 'chrome'
	},


	// Spec patterns are relative to the configuration file location passed
	// to protractor (in this example conf.js).
	// They may include glob patterns.
	specs: ['TestScripts/Banking_Customer.js'],
	

	// Onprepare funciton to set things globally
	onPrepare: function() {
		
		browser.driver.manage().window().maximize();
		
		// Report functionality
		jasmine.getEnv().addReporter(
			new Jasmine2HtmlReporter({
				savePath: 'target/screenshots'
			})
		);
	},

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true, // Use colors in the command line report.
	},
	
};