const { Given, When, Then } = require('@wdio/cucumber-framework')
const { HomePage, SupportAGoodCause, SearchResults, } = require('../pageobjects/simpleSearchPageObject')

const pages = {
    home: HomePage,
    supportAGoodCause: SupportAGoodCause,
    searchResults: SearchResults,
}

Given(/^I open the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When('I click on Find a Cause button in the top bar', async function () {
    try {
        await HomePage.hamburgerButton.click()
    } catch {
        console.log("No hamburger menu visible")
    }

    await expect(HomePage.findACauseButtonByName).toBeClickable()
    await HomePage.findACauseButtonByName.click()
});


Then(/^I am on (\w+) page$/, async (page) => {
    await browser.waitUntil(async () => {
        const currentUrl = await browser.getUrl()
        if (!currentUrl.includes(pages[page].defaultPagePath())) {
            return false;
        }
        return currentUrl
    }, {
        timeoutMsg: "Not on the expected page"
    })
});

When(/^I begin to search for text (\w+)$/, async (searchString) => {
    await (await SupportAGoodCause.searchByNameField).setValue(searchString)
});

When('I select suggestion {int} from the list', async (resultInOrder) => {
    const results = await SupportAGoodCause.autoSuggestListByName
    try {
        const desiredResult = await results.$$('li')[resultInOrder - 1].$('button');
        console.log("The desired result exists in position:", resultInOrder)
        await desiredResult.scrollIntoView({ block: "center" })
        await desiredResult.click();
    } catch {
        console.log("No result option found")
    }
});


When('I press Search cause', async () => {
    var searchButton = await SupportAGoodCause.submitSearchByName
    await SupportAGoodCause.submitSearchByName.scrollIntoView({ block: "center" })
    await SupportAGoodCause.submitSearchByName.waitForEnabled()
    await SupportAGoodCause.submitSearchByName.click()

});

Then(/^result displayed contains (\w+)$/, async (searchParameter) => {
    await browser.waitUntil(async () => {
        const currentUrl = await browser.getUrl()
        if (!currentUrl.includes(pages.searchResults.defaultPagePath())) {
            return false;
        }
        return currentUrl
    }, {
        timeoutMsg: "Not on the expected page"
    })

    const resultInPostion = await SearchResults.listOfResults[0].$('.style_details__YS2pu').$('.style_title__1XLVx')
    await SearchResults.listOfResults[0].scrollIntoView({ block: "center" })
    const title = await resultInPostion.getText()
    await expect(title.toLowerCase()).toContain(searchParameter.toLowerCase())
});