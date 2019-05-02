

let {$, sleep} = require('./funcs');

module.exports=function(){

    let saldoBeforeSender;
    let saldoBeforeReceiver;
    
    
    
    this.Given(/^That there is a bank application browser$/, async function() {
        // Write code here that turns the phrase above into concrete actions
        await helpers.loadPage('http://localhost:3000');
        await sleep(2000);
    });


    this.When(/^I log in with my credentials$/, async function() {
    // Write code here that turns the phrase above into concrete actions
        await driver.findElement(By.xpath("/html/body/header/button[2]/small/a")).click();
        //let loginButton = driver.findElement(By.xpath("/html/body/header/button[2]/small/a"));
        //loginButton.click();
        await sleep(2000);


        //user 1 credentials    
        let user1 = 'javad'
        let user1password = 'davaj1'


        //await helpers.loadPage('http://localhost:3000/#login');
        username = await driver.findElement(By.css("#username"))
        username.sendKeys(user1);
        //await sleep(2000);
        pword = await driver.findElement(By.css("#password"))
        pword.sendKeys(user1password);
        //await sleep(2000);

        await driver.findElement(By.css("button[type=submit]")).click();
        //await sleep(2000);

        

    });

    this.Then(/^I should be able to log in as a client successfully$/, async function() {
    // Write code here that turns the phrase above into concrete actions
        
        await helpers.loadPage('http://localhost:3000/#start');
        
        let result = await driver.findElement(By.className("username")).getText();
        assert.ok(result.includes("javad"));
        console.log(result);
        await sleep(2000);
        
    });

  

    this.Given(/^I navigate to överföringar mina konton from the side menu$/, async function () {
        // Write code here that turns the phrase above into concrete actions
     
        
        saldoBeforeSender = await driver.findElement(By.css("body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(1) > td.text-right")).getText();
        
        saldoBeforeReceiver = await driver.findElement(By.css('body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(2) > td.text-right')).getText();
        
        console.log("This is Sender's saldo before transaction: " + saldoBeforeSender);
        console.log("This is Receiver's saldo before transaction " + saldoBeforeReceiver);

        let transfermyAccount = await driver.findElement(By.css('body > main > div > aside > nav > ul > li:nth-child(6) > button > a'));
        transfermyAccount.click();
        // let val = await saldo.getAttribute('value'); // value from an input field
        
        //await sleep(2000);

    });

    this.When(/^I transfer an amount from my sender account to my other account$/, async function () {
        // Write code here that turns the phrase above into concrete actions
  
        //find the elements and use them 
        let ddElementFromAccount = await driver.findElement(By.css('#fromAccountNumber'));
        ddElementFromAccount.click();
        await sleep(2000);

        let selectedElement1 = await driver.findElement(By.css('#fromAccountNumber > option:nth-child(1)'));
        await sleep(2000);

        let txtElementSum = await driver.findElement(By.css('#sum'));
        txtElementSum.sendKeys('100');
        await sleep(2000);

        let ddElementToAccount = await driver.findElement(By.css('#toAccountNumber > option:nth-child(2)'));
        ddElementToAccount.click();
        await sleep(2000);

        let txtElementMeddelande = await driver.findElement(By.xpath("//*[@id='label']"));
        txtElementMeddelande.sendKeys('For shopping');
        await sleep(2000);

        await driver.findElement(By.css("button[type=submit]")).click();
     
        await sleep(2000);
        
    });

      this.Then(/^the receiver account shall receive the amount$/, async function(){
        // Write code here that turns the phrase above into concrete actions
            //#2 copy #1 
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        let saldoAfterSender = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > td.text-right')).getText();
        let saldoAfterReceiver = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(2) > td.text-right')).getText();
        
        console.log("This is sender's saldo after transaction  " + saldoAfterSender)
        console.log("This is receivers saldo after transaction  " + saldoAfterReceiver)
        await sleep(2000);

        assert.ok(saldoAfterSender<saldoBeforeSender);
        assert.ok(saldoBeforeReceiver<saldoAfterReceiver);

         
    });
  
    this.Given(/^I am logged in and navigate to Mina konton$/, async function () {
        
        let transfermyAccount = await driver.findElement(By.css('body > main > div > aside > nav > ul > li:nth-child(6) > button > a'));
        transfermyAccount.click();


    });
    
   
    this.When(/^I make 11 transactions from Lönekonto to Savings$/, async function () {
        // Write code here that turns the phrase above into concrete actions
        
        let i;
        for (i = 1; i < 2; i++) {

        let ddElementFromAccount = await driver.findElement(By.css('#fromAccountNumber'))
        ddElementFromAccount.click()
        await sleep(1000)

        let selectedElement1 = await driver.findElement(By.css('#fromAccountNumber > option:nth-child(1)'))
        await sleep(500)

        let txtElementSum = await driver.findElement(By.css('#sum'))
        txtElementSum.sendKeys('100')
        await sleep(500)

        let ddElementToAccount = await driver.findElement(By.css('#toAccountNumber > option:nth-child(2)'))
        ddElementToAccount.click()
        await sleep(500)

        let txtElementMeddelande = await driver.findElement(By.xpath("//*[@id='label']"))
        txtElementMeddelande.sendKeys('transaction' + i)
        await sleep(500)

        await driver.findElement(By.css("button[type=submit]")).click()

        await sleep(500)

        let transfermyAccount = await driver.findElement(By.css('body > main > div > aside > nav > ul > li:nth-child(6) > button > a'))
        transfermyAccount.click();
        
        //console.log(i)
        }

        
      });

      
    this.When(/^I click on Visa mer button$/, async function () {
        // Write code here that turns the phrase above into concrete actions

        await helpers.loadPage('http://localhost:3000/#my-accounts');
        
        let accountLF = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > th > a'))
        accountLF.click()
        await sleep(2000)

        let showMore = await driver.findElement(By.css('#show-button'))
        showMore.click()
        await sleep(2000);
    });

    this.Then(/^I will see all transactions for this account$/, async function () {
        // Write code here that turns the phrase above into concrete actions
       
        let xpathVisaFlerButton="//*[@id='show-button']"; 
        let xpathTableTransactios = "//section[@class='history row px-6']//tbody/tr";

        //count number of transactions before pressing visa flere
        let tableTransactionsCount = await driver.findElements(By.xpath(xpathTableTransactios));
        let trCountBeforePressVisaFler = tableTransactionsCount.length; 
        console.log("dette er antal før tryk på Visa Flera " + trCountBeforePressVisaFler );
        
        //press Visa Flera
        await driver.findElement(By.xpath(xpathVisaFlerButton)).click();
        await sleep(2000);
        
        //count number of transactions before pressing visa flere
        tableTransactionsCount = await driver.findElements(By.xpath(xpathTableTransactios));
        let trCountAfterPressVisaFler = tableTransactionsCount.length;
        
        console.log("dette er antal efter tryk på visa fleera " + trCountAfterPressVisaFler);
       
        //assert that Countbefore less than countafter
        assert.ok(trCountAfterPressVisaFler>trCountBeforePressVisaFler);

        

    });

    this.Given(/^I am logged in$/, function () {
        // Write code here that turns the phrase above into concrete actions
        
    });


    this.When(/^I want to change account name$/, async function () {
        // Write code here that turns the phrase above into concrete actions

        let minaKontonCss = "body > main > div > aside > nav > ul > li:nth-child(4) > button > a"
        let changeAccountNameCss = "body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(2) > td:nth-child(5) > button"
        let changeNameInputCss = "#changeName"
        let changeButtonCss = "#changeNameModal > div > div > div.modal-footer > button.change-account-btn.btn.btn-primary"

        let minaKonton = await driver.findElement(By.css(minaKontonCss))
        minaKonton.click()
        await sleep(2000)

        let changeAccountName = await driver.findElement(By.css(changeAccountNameCss))
        changeAccountName.click()
        await sleep(2000)

        let changeNameInput = await driver.findElement(By.css(changeNameInputCss))
        changeNameInput.sendKeys('car saving')
        await sleep(2000)

        let changeButton = await driver.findElement(By.css(changeButtonCss))
        changeButton.click()
    });

    this.Then(/^the account name shall change successfully$/, async function () {

        let resultCss = "/html/body/main/div/article/section[1]/table/tbody/tr[2]/th/a"
        let result = await driver.findElement(By.xpath(resultCss)).getText();
        assert.ok(result.includes("car saving"));
        console.log(result);
        await sleep(2000);
        
        
      });

      this.Given(/^I navigate to mina konton$/, async function () {
        
        let minaKontonCss = "body > main > div > aside > nav > ul > li:nth-child(4) > button > a"
        
        let minaKonton = await driver.findElement(By.css(minaKontonCss))
        minaKonton.click()
        await sleep(2000)
        

      });

      this.When(/^I click on any of my accounts$/, async function () {
        // Write code here that turns the phrase above into concrete actions

        let accountLF = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > th > a'))
        accountLF.click()
        await sleep(2000)

                
      });

      this.Then(/^I am shown my last 10 transactions for that particular account$/, async function () {
       
        let xpathTableRows = "//section[@class='history row px-6']//tbody/tr"
        let tableRowCount = await driver.findElements(By.xpath(xpathTableRows))
        let trCount = tableRowCount.length                                                      
        console.log("Antal transaktioner: " + trCount)
        assert.ok(trcount = 10);
        

       
      });


}


    
      






      
