    const { Builder ,Browser, WebDriver, By, Key} = require("selenium-webdriver");
    const firefox = require('selenium-webdriver/firefox');
    const waitSeconds = seconds => new Promise(resovle => {
        setTimeout(() => resovle(), seconds * 1000);
    })
    const firefoxOptions = new firefox.Options();
    firefoxOptions.addArguments('--headless');
    describe("Todo's List", () => {
        /** @type {WebDriver} */
        let driver;
        beforeAll(async () => {
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build();
        },500000);

        afterAll(async () => {
            await driver.quit();
        },500000);

        test("Can add Todo's list", async () => {
            await driver.get("https://todo-dev1182741-4e3c827bbc90e83380ca8ec123226786ba5921104f9ab7b.gitlab.io/");
            const titleElement = await driver.findElement(By.id("title"));
            await titleElement.clear();
            await titleElement.sendKeys("This is a new title");
            await waitSeconds(0.5)
            const description = await driver.findElement(By.id("description"));
            await description.clear();
            await description.sendKeys("Test");
            await waitSeconds(0.5)
            await driver.findElement(By.id("add")).click();
            await waitSeconds(3);
        },500000);
        test("Clear list", async () => {
            await driver.findElement(By.id("clear")).click();
            await waitSeconds(0.5)
            const alert = await driver.switchTo().alert();
            
            await alert.accept();
            await driver.findElement(By.id("confirmClear")).click();
            const tableBodyElement = await driver.findElement(By.id('tableBody'));
            const rows = await tableBodyElement.findElements(By.tagName('tr'));
            if (rows.length === 0) {
                console.log('Table body is empty');
            } else {
                console.error('Table body is not empty');
            }
            await waitSeconds(0.5)
            await waitSeconds(3);
        },500000)

    });