*** Settings ***
Library     SeleniumLibrary


*** Keywords ***
Open Chrome To
    [Documentation]    When Chrome window doesn't open properly, try this.
    [Arguments]    ${url}
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome_options}    add_argument    --remote-debugging-port\=9222
    ${excludeSwitches_list}=    Create List    enable-logging
    Call Method    ${chrome_options}    add_experimental_option    excludeSwitches    ${excludeSwitches_list}
    Call Method    ${chrome_options}    add_experimental_option    useAutomationExtension    ${false}
    Open Browser    ${url}    chrome    options=${chrome_options}
