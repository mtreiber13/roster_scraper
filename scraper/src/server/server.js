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
var express = require("express");
var pup = require("../web_crawler/pupFunctions");
var bodyParser = require('body-parser');
var cors = require("cors");
var scraper = require("../web_crawler/siteScraper");
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.get("/", function (req, res) {
    console.log("responding to root get");
    res.send("API is working at root");
});
app.post("/start_scrape", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a, browser, page, links, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = req.body.value;
                return [4 /*yield*/, pup.setUp(pup.options)];
            case 1:
                _a = _b.sent(), browser = _a[0], page = _a[1];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, , 8]);
                return [4 /*yield*/, pup.goTo(page, url)];
            case 3:
                _b.sent();
                return [4 /*yield*/, page.waitFor(40000)];
            case 4:
                _b.sent();
                return [4 /*yield*/, scraper.getSportLinks(page)];
            case 5:
                links = _b.sent();
                console.log("GOT LINKS");
                return [4 /*yield*/, page.waitFor(40000)];
            case 6:
                _b.sent();
                res.send(links);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                res.send("ERROR: " + err_1 + "\nBAD URL = " + url + "\n");
                return [3 /*break*/, 8];
            case 8: return [4 /*yield*/, pup.shutDown(browser)];
            case 9:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
app.set('port', process.env.PORT || 2999);
app.listen(2999, function () {
    console.log("++ Server is running");
});
