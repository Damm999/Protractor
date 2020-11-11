const { element, protractor } = require("protractor");
var EC = protractor.ExpectedConditions;

function mapsObjects() {
   
      this.searchbox = $('#searchboxinput');

      this.searchButton = $('#searchbox-searchbutton')

      this.directionsButton = $("button[data-value='Directions']")

      this.startpointTextBox = $('input[placeholder="Choose starting point, or click on the map..."]')
      this.startpointSearchButton = element(by.xpath('(//button[@data-tooltip="Search"])[1]'))


      this.getUrl = function(){
        /*  browser.driver.ignoreSynchronization = true;
          browser.waitForAngularEnabled(false);*/
          browser.waitForAngularEnabled(false);
          browser.get("https://www.google.com/maps");
      }

      this.searchDestination = function (destination) {
          this.searchbox.sendKeys(destination)
          this.searchButton.click();
      }

      this.clickOnDirections = function () {
        browser.wait(EC.visibilityOf(this.directionsButton),3000);
        this.directionsButton.click();
      }

      this.enterChoosePoint = function (source) {
        browser.wait(EC.visibilityOf(this.startpointTextBox),3000)
          this.startpointTextBox.sendKeys(source)
          this.startpointSearchButton.click();
      }

}

module.exports = new mapsObjects();