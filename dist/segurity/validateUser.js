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
Object.defineProperty(exports, "__esModule", { value: true });
const decodejwt_1 = require("../utils/decodejwt");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth)
        return next();
    const token = auth === null || auth === void 0 ? void 0 : auth.split(' ')[1];
    const user = yield (0, decodejwt_1.decode)(token);
    const { hasPivileges } = user;
    if (!hasPivileges) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    res.locals.user = user;
    return next();
});
