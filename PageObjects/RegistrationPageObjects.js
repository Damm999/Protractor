/**
 * Registration Page Objects
 */

function registration() {
	
	this.getUrl = function(){
		browser.get("http://www.way2automation.com/angularjs-protractor/registeration/#/login");
	}

	this.userNameTextBox = element(by.id("username"));
	this.password = element(by.id("password"));
	this.userNameDescTextBox = element(by.name("formly_1_input_username_0"));
	this.loginButton = element(By.css("button[class='btn btn-danger']"));
	
	// error divs
	this.userNameErrorLabel = element(by.css("body > div.jumbotron > div > div > div > form > div:nth-child(1) > div > div"));
	this.passwordErrorLabel = element(by.css("body > div.jumbotron > div > div > div > form > div:nth-child(2) > div > div"));
	this.errorLabel = element(by.css('body > div.jumbotron > div > div > div > div.alert.alert-danger.ng-binding.ng-scope'));
	
	
	//validations 
	this.logoutLink = element(by.css("a[href='#/login']"));
	
}

module.exports = new registration();