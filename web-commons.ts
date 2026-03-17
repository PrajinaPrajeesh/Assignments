import { expect, Locator, Page } from "@playwright/test";

export class WebCommons {
    page: Page;

    //constructor method to provide current browser tab details to perform the actions.

    constructor(page: Page) {
        this.page = page;
    }

    //common method to generate web element from the locator

    element(selectors: string): Locator {
        return this.page.locator(selectors);
    }
    //Common method to launch the application and verify the title
    async launchApplication(url: string, title?: string) {
        await this.page.goto(url);
        if (title) {
            await expect(this.page).toHaveTitle(title);
        }
    }

    //common method to scroll to the web element
    async scrollToElement(selectors: string) {
        await this.element(selectors).scrollIntoViewIfNeeded();
    }

    // common method to click on the web element
    async clickElement(selectors: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).click();
    }


    // common method to double click on the web element
    async doubleClickElement(selectors: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).dblclick();
    }

    // common method to right click on the web element
    async rightClickElement(selectors: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).click({ button: "right" });
    }

    // common method to mouse over(hover) on the web element
    async hoverClickElement(selectors: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).hover();
    }

    // common method to force click on the disabled web element  
    async  forceClickElement(selectors: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).click({force : true});
    }

    // common method to click and hold on the web element  
    async clickAndHoldElement(selectors: string) {
        await this.scrollToElement(selectors);
        const elementHandle = await this.element(selectors).elementHandle();
        if(elementHandle){
            await elementHandle.hover();
            await this.page.mouse.down();
        }
    }
    // common method to clear the text entered into the text box
     async clearTextBox(selectors: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).clear();
    }

    // common method to enter the text into the text box
     async enterTextBox(selectors: string ,text :string) {
        await this.clearTextBox(selectors);
        await this.element(selectors).fill(text);
    }

    // common method to select the option from the drop down
     async selectOption(selectors: string , option :string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).selectOption(option);
    }
     // common method to check the checkbox only if it is not already checked
     async checkCheckBox(selectors: string ) {
        await this.scrollToElement(selectors);
        const isChecked = await this.element(selectors).isChecked();
        if(!isChecked){
            await this.element(selectors).check();
        }
    }
    // common method to uncheck the checkbox only if it is not already checked
     async uncheckCheckBox(selectors: string ) {
        await this.scrollToElement(selectors);
        const isChecked = await this.element(selectors).isChecked();
        if(isChecked){
            await this.element(selectors).uncheck();
        }
    }
    //common method to check the radio button
    async checkRadioButton(selectors: string ) {
        await this.scrollToElement(selectors);
        await this.element(selectors).check();
    }

     //common method to extract the text value from the element
    async getText(selectors: string ): Promise<string| null> {
        await this.scrollToElement(selectors);
        return await this.element(selectors).textContent();
    }
    //common method to extract the attribute value from the element
    async getAttribute(selectors: string , attribute: string): Promise<string| null> {
        await this.scrollToElement(selectors);
        return await this.element(selectors).getAttribute(attribute);
    }
    
    //common method to upload the file
     async uploadFile(selectors: string , filePath: string) {
        await this.scrollToElement(selectors);
        await this.element(selectors).setInputFiles(filePath);
    }

    //common method to verify the visibility of an element
     async isElementVisible(selectors: string) {
        await expect(this.element(selectors)).toBeVisible();
    }

    //common method to verify the element is enabled or not
     async isElementEnabled(selectors: string) {
        await expect(this.element(selectors)).toBeEnabled();
    }

    //common method to verify the text value of the element
    async isTextValueCorrect(selectors: string , expectedText:string) {
        await expect(this.element(selectors)).toHaveText(expectedText);
    }

    //common method to verify the attribute value of the element
    async isAttributeValueCorrect(selectors: string , attribute: string, expectedValue:string) {
        await expect(this.element(selectors)).toHaveAttribute(attribute, expectedValue);
    }

    //common method to verify the element is not visible
    async isElementNotVisible(selectors: string) {
        await expect(this.element(selectors)).toBeHidden();
    }

    //common method to deal with alerts
    async handleAlert(action:string) {
        this.page.on("dialog", async(dialog)=> {
            if (action === "accept"){
                await dialog.accept();
            }else if(action ==="dismiss"){
                await dialog.dismiss();
            }
        });
    }

}


