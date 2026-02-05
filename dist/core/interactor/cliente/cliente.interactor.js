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
exports.findCliente = exports.deleteCliente = exports.updateCliente = exports.createCliente = void 0;
const createCliente = (clienteRepository) => (cliente) => __awaiter(void 0, void 0, void 0, function* () { return clienteRepository.createCliente(cliente); });
exports.createCliente = createCliente;
const updateCliente = (clienteRepository) => (cliente) => __awaiter(void 0, void 0, void 0, function* () { return clienteRepository.updateCliente(cliente); });
exports.updateCliente = updateCliente;
const deleteCliente = (clienteRepository) => (cliente) => __awaiter(void 0, void 0, void 0, function* () { return clienteRepository.deleteCliente(cliente); });
exports.deleteCliente = deleteCliente;
const findCliente = (clienteRepository) => (cliente) => __awaiter(void 0, void 0, void 0, function* () {
    clienteRepository.findCliente(cliente.id);
});
exports.findCliente = findCliente;
