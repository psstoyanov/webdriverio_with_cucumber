Feature: Easyfundraising Search
    Easyfundraising Search

  Background: Navigate from home to search page
    Given I open the home page
    When I click on Find a Cause button in the top bar
    Then I am on supportAGoodCause page

  Scenario Outline: Search cause on Easyfundraising
    Given I begin to search for text <query>
    And I select suggestion 3 from the list
    When I press Search cause
    Then result displayed contains <result>

    Examples: 
      | query | result |
      | vac   | vac    |
      | bac   | bac    |
