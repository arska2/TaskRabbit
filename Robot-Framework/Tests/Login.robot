*** Settings ***
Library     SeleniumLibrary
Resource    ../Resources/Chrome.resource


*** Test Cases ***
Verify Succesful Login to TaskRabbit
    [Documentation]    This test case verifies that user is able to succesfully login
    [Tags]    smoke
    Open Chrome To    http://localhost:3000/
    Wait Until Element Is Visible    id:nav-btn-login    timeout=5
    Click Element    id:nav-btn-login
    Wait Until Element Is Visible    id:txt-username    timeout=5
    Input Text    id:txt-username    admin
    Input Password    id:txt-password    admin
    Click Element    id:btn-login
    Wait Until Element Is Visible    id:nav-btn-myTasks    timeout=5
    Element Should Be Visible    id:nav-btn-myTasks
    Close Browser
