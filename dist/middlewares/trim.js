"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepTrim_1 = require("../utils/deepTrim");
exports.default = (req, _, next) => {
    (0, deepTrim_1.DeepTrim)(req.query);
    (0, deepTrim_1.DeepTrim)(req.body);
    (0, deepTrim_1.DeepTrim)(req.params);
    next();
};
