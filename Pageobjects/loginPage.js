function onechat() {

   //-----------locators----------------------------
    this.userMail = element(by.id("email"));
    this.userPassword = element(by.id("pwd"));
    this.signin = element(by.css("button[class='sign-btn']"));
    this.emailErrorMsg = element(by.xpath("//span[@class='errmsg ng-star-inserted']"))
    this.passwordErrorMsg = element(by.xpath("//div[@class='errmsg ng-star-inserted']"))
    this.inCorrectErrMsg = element(by.id("err-msg"));
    this.inValidemail=element(by.xpath("//span[@class='errmsg ng-star-inserted']"))

    //-----------action methods--------------------------------

    this.enterUserEmail = function (usernamedata) {
        this.typeing(this.userMail, usernamedata);

    }
    this.enterPassword = function (password) {
        this.typeing(this.userPassword, password);

    }
    this.signbtn = function () {
        this.clickOnBtn(this.signin);

    }

    //----------------reuseable methods------------------------

    //-------this code for typeing

    this.typeing = function (ele, userdata) {
        let condition = ExpectedConditions.visibilityOf(ele)
        browser.wait(condition, 30000);
        ele.clear();
        ele.sendKeys(userdata);
    }

    //this code for clicking
    this.clickOnBtn = function (ele) {
        let condition = ExpectedConditions.visibilityOf(ele)
        browser.wait(condition, 30000);
        ele.click();
    }
    
    //this code for getting text
    this.eleGetText = function (ele) {
        let condition = ExpectedConditions.visibilityOf(ele)
        browser.wait(condition, 30000);
        return ele.getText();
    }

    //this code for checking element is present
    this.elePresent = function (ele) {
        let condition = ExpectedConditions.visibilityOf(ele)
        browser.wait(condition, 30000);
        return ele.isPresent();
    }





};
module.exports = new onechat();