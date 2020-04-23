/**
 * App Registration
 */

var regPage = require(".././PageObjects/RegistrationPageObjects.js")

var validD = require("../Data/ARegistrationTestData")
var invalidData = require("../Data/ARegistrationInvalidTestData")
var validData = require("../Data/ARegistrationValidTestData")

var using = require("jasmine-data-provider")

describe("App Registration", function() {

	beforeEach(function() {
		regPage.getUrl();
	})

	using(validD.dataset, function(data, description) {
		it("Register and Login with valid data: "  + description,function() {
			regPage.userNameTextBox.sendKeys(data.username);
			regPage.password.sendKeys(data.password);
			regPage.userNameDescTextBox.sendKeys(data.userdec);
			regPage.loginButton.click().then(function() {
				expect(regPage.logoutLink.isPresent()).toBe(true);
			});
		})
	});
	afterEach(function() {
		console.log("Sucessful registration")
	})


	beforeEach(function() {
		regPage.getUrl();
	})
	using(invalidData.dataset, function(data, description) {
		it("Register with invalid data: "  + description, function() {
			regPage.userNameTextBox.sendKeys(data.username);
			regPage.password.sendKeys(data.password);
			regPage.userNameDescTextBox.sendKeys(data.userdec);
			regPage.loginButton.click().then(function() {
				regPage.errorLabel.getText().then(function(data) {
					console.log("error: " +  data);
					expect(data).toBe('Username or password is incorrect');
				});
			});
		})
	});

	afterEach(function() {
		console.log("Failed registration")
	})

	beforeEach(function() {
		regPage.getUrl();
	})
	using(validData.dataset, function(data, description) {
		it("Registeration Page Validations: "  + description, function() {

			// UserName Validations
			regPage.userNameTextBox.sendKeys(data.uinvalid).then(function() {
				regPage.userNameErrorLabel.getText().then(function(errorText) {
					expect(errorText).toBe('Your username must be between 3 and 50 characters long');
				})
			});

			regPage.userNameTextBox.clear().then(function() {
				regPage.userNameErrorLabel.getText().then(function(errorText) {
					expect(errorText).toBe('You did not enter a username');
				})
			});
			regPage.userNameTextBox.sendKeys("test").then(function() {
				expect(regPage.userNameErrorLabel.isPresent()).toBe(false);
			});



			// Password Validations

			regPage.password.sendKeys(data.pinvalid).then(function() {
				regPage.passwordErrorLabel.getText().then(function(errorText) {
					expect(errorText).toBe('Your username must be between 3 and 100 characters long');
				})
			});
			regPage.password.clear().then(function() {
				regPage.passwordErrorLabel.getText().then(function(errorText) {
					expect(errorText).toBe('You did not enter a username');
				})
			});

			regPage.password.sendKeys(data.password).then(function() {
				expect(regPage.passwordErrorLabel.isPresent()).toBe(false);
			});

			regPage.userNameDescTextBox.sendKeys(data.userdec);
			regPage.loginButton.click().then(function() {
				regPage.errorLabel.getText().then(function(data) {
					console.log("error: " + data);
					expect(data).toBe('Username or password is incorrect');
				});
			});


			// Successsfull Registration
			regPage.userNameTextBox.clear()
			regPage.userNameTextBox.sendKeys(data.username);
			regPage.password.clear()
			regPage.password.sendKeys(data.password);
			regPage.userNameDescTextBox.clear();
			regPage.userNameDescTextBox.sendKeys(data.userdec);
			regPage.loginButton.click().then(function() {
				expect(regPage.logoutLink.isPresent()).toBe(true);
			});
		})
	});
	afterEach(function() {
		console.log("Validations chek is performed on registration page")
	})
})