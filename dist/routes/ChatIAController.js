"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatIAController_1 = require("../controllers/ChatIAController");
const router = (0, express_1.Router)();
router.post('/chatia', ChatIAController_1.chatWithIA);
exports.default = router;
