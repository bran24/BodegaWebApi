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
exports.searchProduct = exports.updateProduct = exports.listProduct = exports.deleteProduct = exports.createProduct = void 0;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json();
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json();
});
exports.deleteProduct = deleteProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json();
});
exports.listProduct = listProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json();
});
exports.updateProduct = updateProduct;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json();
});
exports.searchProduct = searchProduct;
