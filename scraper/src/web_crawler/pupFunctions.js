// Puppeteer Library for testing 

// import the needed libraries
const puppeteer = require('puppeteer');

// prefered options for puppeteer
const options = {
    headless: false, // run in headless mode
    ignoreHTTPSErrors: true, // self explantory
    pipe: true,     // use pipes instead of websocket (no dev port opened)
    slowMo: 100,    // slow down the process slightly for clipping issues
}

// does the puppeteer set up (creates browser, page)
// open browser and go to page, wait for it to load
async function setUp(pupOptions) {
    const browser = await puppeteer.launch(pupOptions);
    const page = await browser.newPage();
    await page.setViewport({width: 1500, height: 1100});
    console.log('-- Started Browser');
    return [browser, page];
}

// shuts down puppeteer operations 
// browser = puppeteer object   
async function shutDown(browser){
    await browser.close();
    console.log('-- Closed Browser')
}

// wait for page to load
// page = puppeteer object
// returns true when page has loaded
async function waitForPage(page) {
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
    });
    console.log('   -- Page Loaded')
    return true
}

// goes to desired url and waits until all content is downloaded, plus another 5 seconds
// page = puppeteer object
// url = desired url
async function goTo(page, url) {
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    console.log('-- At Webpage: ' + page.url())
    return true 
}

// This function executes a click through puppeteer
// page = puppeteer page object
// selector = selector for the button to be pressed
// invisible = 1 if the element is invisible
// clicks = can specify a double click
// returns resulting url
async function click(page, selector, invisible = 0, clicks = 1) {
    // decide if invisible / make click
    if (invisible === 0) {
        await page.waitForSelector(selector, {timout: 1000, visible: true});
        await page.click(selector, {clickCount: clicks});
    } else {
        await page.evaluate( (selector) => {
            return document.querySelector(selector).click();
        }, selector)
    }
    // report if clicked sucessfully
    console.log('-- Selector clicked: ' + selector);
    return (await page.url());
}

// hits key on page
// page = puppeteer object
// key = key to be pressed -> need to check api for specific stirng
async function pressKey(page, key) {
    await page.keyboard.press(key);
    console.log('-- Key Pressed: ' + key);
}

// types text into given selector on page
// page = puppeteer object
// selector = place to type
// text = string to be typed
async function type(page, selector, text) {
    await page.waitForSelector(selector)
    await page.focus(selector)
    await page.keyboard.type(text)
    console.log('-- Typed Text: ' + text);
}

// download file to location
// page = puppeteer object
// returns if dowload was successful
async function download(page, selector, path) {
    await click(page, selector)
    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: '/home/browserless', // specify path to downlaod to
    });
}

// wait for download to compelete
// page = puppeteer object
// path = path to location of download, including the download file name
// returns true when complete
async function waitForDownload(page, path) {
    
}

// export the functions in order to use for building tests
module.exports = {
    options,                setUp,
    shutDown,               waitForPage,
    goTo,                   download,
    pressKey,               type,
    click           
}