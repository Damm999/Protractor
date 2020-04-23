/**
 * Forms and Alerts
 */

/**
 * App Registration
 */

var bankPage = require(".././PageObjects/Banking_HomePageObjects.js")

var cust = require("../Data/BankingFormData")
var acc = require("../Data/BankingOpenAccount")

var using = require("jasmine-data-provider")
var EC = protractor.ExpectedConditions;

describe("Login as Customer and  Fill up", function() {

	beforeEach(function() {
		bankPage.getUrl();
	})
	using(cust.dataset, function(data, description) {
		it("Login as Customer and Deposit " + data.amountd + " and withdraw " + data.amountw + " for: " + description, function() {

			bankPage.custLoginButton.click();
			bankPage.selectUser(data.user);
			bankPage.loginButton.click();
			var amount = 0;
			bankPage.amountLabel.getText().then(function(currAmount) {
				amount = parseInt(currAmount);
			})
			bankPage.depositButton.click();
			bankPage.amountTextBox.sendKeys(data.amountd);
			bankPage.depositOrWithdrawlButton.click().then(function() {
				bankPage.amountLabel.getText().then(function(currAmount) {
					amount = amount + data.amountd;
					expect(parseInt(currAmount)).toBe(amount);
					bankPage.successLabel.getText().then(function(succText) {
						expect(succText).toBe("Deposit Successful");
					})
				})
			});

			bankPage.withdrawlButton.click();
			bankPage.amountTextBox.sendKeys(data.amountw);
			bankPage.depositOrWithdrawlButton.click().then(function() {
				bankPage.amountLabel.getText().then(function(currAmount) {
					amount = amount - data.amountw;
					expect(parseInt(currAmount)).toBe(amount);
					bankPage.successLabel.getText().then(function(succText) {
						expect(succText).toBe("Transaction successful");
					})
				})
			});

		});
	});

	afterEach(function() {
		console.log("Sucessful registration")
	})


	beforeEach(function() {
		bankPage.getUrl();
	})

	using(acc.dataset, function(data, description) {
		it("Login as Manager and Open an Account: " + description, function() {


			bankPage.managerLoginButton.click();

			var name = data.fname + " " + data.lname;

			bankPage.addCustomerButton.click().then(function() {

				bankPage.fnameTextBox.sendKeys(data.fname);
				bankPage.lnameTextBox.sendKeys(data.lname);
				bankPage.postcodeTextBox.sendKeys(data.postCode);
				var cusId = "";
				bankPage.addnewCustomerButton.click().then(function() {
					browser.switchTo().alert().then(function(alert) {
						alert.getText().then(function(text) {
							cusId = text.substring(text.indexOf(":") + 1);
							console.log(cusId);
						})
						alert.accept();
					});
				});
			});

			var accNum = "";
			bankPage.openAccountButton.click().then(function() {
				bankPage.homeButton.click();
				bankPage.managerLoginButton.click();
				bankPage.openAccountButton.click();
					bankPage.selectCustUser(name);
					bankPage.selectUserCurrency(data.currency);
					bankPage.processButton.click().then(function() {
						browser.switchTo().alert().then(function(alert) {
							alert.getText().then(function(text) {
								accNum = text.substring(text.indexOf(":") + 1);
								console.log(accNum);
							});
							alert.accept();
						});
					});
				});

			bankPage.customersButton.click().then(function() {
				bankPage.customersList(accNum);
			});
			bankPage.homeButton.click();
			
		});
	});


	afterEach(function() {
		console.log("Sucessfully Opened an Account.")
	})




})