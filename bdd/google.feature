# state: "final"
# doc: [Create microapps](https://code.citrite.net/projects/PD/repos/en-us-micro-apps/browse/en-us/citrix-microapps/create-microapps.md)
# doc: [Getting started](https://code.citrite.net/projects/PD/repos/en-us-micro-apps/browse/en-us/citrix-microapps/getting-started.md)

Feature: The big search feature

    I want to find TestCafe repository by Google search

    @googleHook
    Scenario: Searching for TestCafe by Google
        Given I open Google's search page
        When I am typing my search request "github TestCafe" on Google
        And I am pressing "enter" key on Google
        Then I should see that the first Google's result is "DevExpress/testcafe:"

    Scenario Outline: Searching for <keyword> on Google
        Given I open Google's search page
        When I am typing my search request "<keyword>" on Google
        And I am pressing "enter" key on Google
        Then I should see that the first Google's result is "<result-text>"

        Examples:
            | keyword  | result-text |
            | facebook | Facebook    |
            | twitter  | Twitter     |