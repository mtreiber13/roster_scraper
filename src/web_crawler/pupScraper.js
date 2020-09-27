"use strict";
// This file contains the scraper for teams that have less than 
// 4 columns of data. This function is only called when needed
// as this scraping method is slower and has a higher tedency of
// breaking.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import the needed libraries
var puppeteer = require('puppeteer');
var options = {
    headless: true,
    ignoreHTTPSErrors: true,
    pipe: true,
    slowMo: 100
};
// does the puppeteer set up (creates browser, page)
// open browser and go to page, wait for it to load
function setUp() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch(options)];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1500, height: 1100 })];
                case 3:
                    _a.sent();
                    console.log('-- Started Browser');
                    return [2 /*return*/, [browser, page]];
            }
        });
    });
}
// shuts down puppeteer operations 
// browser = puppeteer object   
function shutDown(browser) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.close()];
                case 1:
                    _a.sent();
                    console.log('-- Closed Browser');
                    return [2 /*return*/];
            }
        });
    });
}
// gets url from the page puppeteer object
// input: page object
// output: the HTML of the current page location
function getHTML(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function () { return document.body.innerHTML; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// scrapes all roster data from any roster page that is found in
// on the print screen
// input: url to roster (in print form)
// output: string[][] 
function pupScrape(url) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, browser, page, players;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setUp()
                    // go to the desired URL
                ];
                case 1:
                    _a = _b.sent(), browser = _a[0], page = _a[1];
                    // go to the desired URL
                    return [4 /*yield*/, page.goto(url)];
                case 2:
                    // go to the desired URL
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(2000)
                        // scrape the roster data
                    ]; // extra buffer to allow page to load -> this might break if connection is bad and more time is needed
                case 3:
                    _b.sent(); // extra buffer to allow page to load -> this might break if connection is bad and more time is needed
                    return [4 /*yield*/, page.evaluate(function () {
                            var players = Array.from($('table#DataTables_Table_0').find('tr')).map(function (x) {
                                return Array.from(x.children).map(function (y) { return y.innerText; }); // not sure how to get this any out
                            });
                            return players;
                        })];
                case 4:
                    players = _b.sent();
                    return [4 /*yield*/, shutDown(browser)];
                case 5:
                    _b.sent();
                    return [2 /*return*/, players];
            }
        });
    });
}
module.exports = {
    pupScrape: pupScrape, getHTML: getHTML
};
