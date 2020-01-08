"use strict";
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
var cheerio = require("cheerio");
var request = require("request");
var cheer = require("./cheerioLib");
var pup = require("./pupScraper");
// converts a roster url that was scraped from home to page to 
// one that can be used to scrape roster data
// input: url to a specific team
// output: url to print page of roster to be scraped
function createValidUrl(url) {
    return __awaiter(this, void 0, void 0, function () {
        var newUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cheer.getResponseHref(url)];
                case 1:
                    newUrl = _a.sent();
                    return [2 /*return*/, (newUrl + "?&print=true")];
            }
        });
    });
}
// scrapes the links to all teams on the school's page
// input: school athletics url
// output: string[] of urls to specific tems
function findTeamUrls(rawHTML) {
    var $ = cheerio.load(rawHTML);
    return $('a[href*="/roster.aspx?path="]');
}
function getTeamPages(url) {
    return __awaiter(this, void 0, void 0, function () {
        var goodUrl, raw, hrefJSON, urls, key, path, newUrls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createValidUrl(url)];
                case 1:
                    goodUrl = _a.sent();
                    return [4 /*yield*/, cheer.getRawHTML(goodUrl)];
                case 2:
                    raw = _a.sent();
                    hrefJSON = findTeamUrls(raw);
                    urls = [];
                    for (key in hrefJSON) { // create link with correct path
                        try {
                            path = hrefJSON[key]['attribs']['href'];
                            if (path != undefined) {
                                urls.push(url + path);
                            }
                        }
                        catch (_b) {
                        }
                    }
                    newUrls = [];
                    urls.map(function (x) {
                        if (!newUrls.includes(x)) {
                            newUrls.push(x);
                        }
                    });
                    return [2 /*return*/, newUrls];
            }
        });
    });
}
function scrapeRosterGrid(url) {
    return __awaiter(this, void 0, void 0, function () {
        var goodUrl, raw, $, rows, players, title, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createValidUrl(url)];
                case 1:
                    goodUrl = _a.sent();
                    return [4 /*yield*/, cheer.getRawHTML(goodUrl)];
                case 2:
                    raw = _a.sent();
                    $ = cheer.createCheerio(raw);
                    rows = $('table').find('tr') // get all table rows -> table ID does not exist in curl
                    ;
                    players = [];
                    // get all rows from roster page
                    rows.each(function (index, value) {
                        var data = [];
                        var children = $(this).children();
                        for (var i = 0; i < children.length; i++) {
                            data.push($(children[i]).text());
                        }
                        players.push(data);
                    });
                    title = $('h2').eq(0).text();
                    // filter out player rows
                    players = players.filter(function (p) { return (p.length > 3); }); // hard coded b/c coaches have 3 columns, usually players have more
                    if (!(players.length == 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, pup.pupScrape(goodUrl)];
                case 3:
                    players = _a.sent();
                    _a.label = 4;
                case 4:
                    resp = {
                        players: players,
                        title: title
                    };
                    return [2 /*return*/, resp];
            }
        });
    });
}
module.exports = {
    getTeamPages: getTeamPages, scrapeRosterGrid: scrapeRosterGrid,
    createValidUrl: createValidUrl, findTeamUrls: findTeamUrls
};
