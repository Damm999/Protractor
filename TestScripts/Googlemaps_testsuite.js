var mapsPage = require('../PageObjects/mapsPageObjects')

describe("Map Suite",()=>{
    beforeEach(function() {
		mapsPage.getUrl();
    })
    
    it("displaying the distance",()=>{
        mapsPage.searchDestination("Bangalore");
        mapsPage.clickOnDirections();
        mapsPage.enterChoosePoint("Delhi");
    })
})