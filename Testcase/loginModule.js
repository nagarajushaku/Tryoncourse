var data = require("../testData/logindata");
var login = require("../Pageobjects/loginPage")

describe('oncourse login testcases ', function () {

  it('TC_L001 navigate to the login page', function () {

    browser.get("https://staging.tryoncourse.com/sign-in");
    expect(login.elePresent(login.userMail)).toBe(true);

  });

  it('TC_L002 click on sigin with out entering username and password', function () {
    login.signbtn();
    expect(login.eleGetText(login.emailErrorMsg)).toBe(data.logindata.emailErrMessage);
    expect(login.eleGetText(login.passwordErrorMsg)).toBe(data.logindata.passwordErrMessage);

  });

  it('TC_L003 enter incorrect password', function () {

    login.enterUserEmail(data.logindata.useremail);
    login.enterPassword(data.logindata.invaildPassword);
    login.signbtn();
    expect(login.eleGetText(login.inCorrectErrMsg)).toBe(data.logindata.inCrtPwd);


  });

  it('TC_L004 enter in-correct username', function () {

    login.enterUserEmail(data.logindata.invaildUserName);
    login.enterPassword(data.logindata.password);
    login.signbtn();
    expect(login.eleGetText(login.inCorrectErrMsg)).toBe(data.logindata.inCrtEmail);

  });

  it("Tc_L005 Enter in-correct username and capture error message" ,function(){
    login.enterUserEmail(data.logindata.invlaidEmail);
    login.enterPassword(data.logindata.password);
    login.signbtn();
    expect(login.eleGetText(login.inValidemail)).toBe(data.logindata.invalidemailerrmsg)
  })



});