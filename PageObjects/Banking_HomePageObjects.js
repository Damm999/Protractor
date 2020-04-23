/**
 * 
 */

function banking() {
	
	this.getUrl = function(){
	  /*  browser.driver.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);*/
		browser.get("http://www.way2automation.com/angularjs-protractor/banking/");
	}
	
	this.homeButton = element(by.css("button[class='btn home']"));

	this.custLoginButton = element(by.css("button[ng-click='customer()']"));
	this.managerLoginButton = element(by.css("button[ng-click='manager()']"));
	
	//....................................................................
	
	// Customer Page
	
	this.selectUser = function(name) {
		 element(by.id('userSelect')).element(by.cssContainingText('option', name)).click();
	}
	this.loginButton = element(by.css("button[class='btn btn-default']"));
	
	// Customer Home Page
	this.transactionButton = element(by.css("button[ng-class='btnClass1']"));
	this.depositButton = element(by.css("button[ng-class='btnClass2']"));
	this.withdrawlButton = element(by.css("button[ng-class='btnClass3']"));
	
	// deposit Page and Withdrawl Page
	this.amountTextBox = element(by.model("amount"));
	this.depositOrWithdrawlButton = element(by.css("button[class='btn btn-default']"));
	
	//....................................................................
	
	// Validations
	
	//Deposit Successful / Transaction successful
	this.successLabel = element(by.css("span[class='error ng-binding']")); 
	
	// account details
	this.amountLabel = element(by.css("strong[class='ng-binding']:nth-child(2)"));
	this.accountNumberLabel = element(by.css("strong[class='ng-binding']:nth-child(1)"));
	
	
	//....................................................................
	
	// Manager Page
	
	// Manager Home Page
	this.addCustomerButton = element(by.css("button[ng-class='btnClass1']"));
	this.openAccountButton = element(by.css("button[ng-class='btnClass2']"));
	this.customersButton = element(by.css("button[ng-class='btnClass3']"));
	
	// add customer details
	this.fnameTextBox = element(by.model("fName"));
	this.lnameTextBox = element(by.model("lName"));
	this.postcodeTextBox = element(by.model("postCd"));
	this.addnewCustomerButton = element(by.css("button[class='btn btn-default']"));
	
	// open Account 
	
	this.selectCustUser = function(name) {
		 element(by.id('userSelect')).element(by.cssContainingText('option', name)).click();
	}
	
	// Dollar, Pound, Rupee
	this.selectUserCurrency = function(type) {
		 element(by.id('currency')).element(by.cssContainingText('option', type)).click();
	}
	
	this.processButton = element(by.css("button[type='submit']"));
	
	this.customersList = function(customerId) {
		
		element.all(by.repeater("cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer")).each(function(items) {
			items.element(by.css('td:nth-child(4)')).getText().then(function(text) {
			/*	console.log(text);
				console.log("uc: "+customerId);*/
				if(text == customerId)
					expect(true).toBe(true);
			})
		})
	}
	//....................................................................
	
}

module.exports = new banking();