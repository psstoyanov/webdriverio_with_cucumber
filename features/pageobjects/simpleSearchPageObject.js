const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */


class HomePage extends Page {

    get logInHeaderButton() {
        return $('#headerLogin');
    }

    get signUpHeaderButton() {
        return $('#headerSignup');
    }

    get hamburgerButton() {
        return $('.style_hamburgerButton__3zk24');
    }

    get findACauseButtonByName() {
        return $('=Find a cause');
    }

    async pressFindACauseButton() {
        await this.findACauseButton.click();
    }

    open() {
        return super.open('');
    }

    defaultPagePath() {
        return super.defaultPagePath(``)
    }
}

class SupportAGoodCause extends Page {

    get searchByNameWrapper() {
        return $('#sagc-hero-search-input-input-wrap')
    }

    get autoSuggestListByName() {
        return this.searchByNameWrapper.$("//ul['#cause-search-form-input-auto-suggest']")
    }

    get submitSearchByName() {
        return this.searchByNameWrapper.$('//button[@id="sagc-hero-search-submit"]')
    }

    get searchByNameField() {
        return $('#sagc-hero-search-input')
    }

    open() {
        return super.open('support-a-good-cause')
    }

    defaultPagePath() {
        return super.defaultPagePath(`support-a-good-cause`)
    }
}

class SearchResults extends Page {

    get primarySearchResults() {
        return $('#primarySearchResults')
    }

    get listOfResults() {
        return this.primarySearchResults.$$('#causesSearchItem0')
    }

    open() {
        return super.open('search/cause/?')
    }

    defaultPagePath() {
        return super.defaultPagePath('search/cause/?')
    }
}

module.exports = {
    HomePage: new HomePage(),
    SupportAGoodCause: new SupportAGoodCause(),
    SearchResults: new SearchResults(),
};