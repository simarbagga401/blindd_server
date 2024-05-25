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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var DatesSchema_1 = require("../utils/DatesSchema");
var express = require("express");
var router = new express.Router();
var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DatesSchema_1.Datemodel.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                payload = {
                    userImageLink: user === null || user === void 0 ? void 0 : user.userImageLink,
                    password: user === null || user === void 0 ? void 0 : user.password,
                    instagram: user === null || user === void 0 ? void 0 : user.instagram,
                    state: user === null || user === void 0 ? void 0 : user.state,
                    bio: user === null || user === void 0 ? void 0 : user.bio,
                };
                res.send(payload);
                return [2 /*return*/];
        }
    });
}); });
router.put("/", upload.single("file"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var streamifier, cld_upload_stream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.file == undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, DatesSchema_1.Datemodel.updateOne({ email: req.body.email }, {
                        password: req.body.password,
                        instagram: req.body.instagram,
                        state: req.body.state,
                        bio: req.body.bio,
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 5];
            case 2:
                streamifier = require("streamifier");
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload_stream({
                        folder: "images",
                    }, function (error, result) {
                        if (error)
                            res.status(500).send("internal server error");
                        else {
                            DatesSchema_1.Datemodel.updateOne({ email: req.body.email }, {
                                userImageLink: result === null || result === void 0 ? void 0 : result.secure_url,
                                password: req.body.password,
                                instagram: req.body.instagram,
                                state: req.body.state,
                                bio: req.body.bio,
                            })
                                .then(function (msg) { return console.log("image uploaded"); })
                                .catch(function (err) { return console.log(err); });
                            res.send("image uploaded successfully");
                        }
                    })];
            case 3:
                cld_upload_stream = _a.sent();
                streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
                return [4 /*yield*/, DatesSchema_1.Datemodel.updateOne({ email: req.body.email }, {})];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, DatesSchema_1.Datemodel.deleteOne(req.body.email)];
            case 1:
                _a.sent();
                res.send("profile deleted");
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
