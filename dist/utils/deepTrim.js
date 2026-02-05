"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepTrim = void 0;
function DeepTrim(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] == 'string') {
                obj[prop] = obj[prop].trim();
            }
            else if (typeof obj[prop] == 'object') {
                DeepTrim(obj[prop]);
            }
        }
    }
}
exports.DeepTrim = DeepTrim;
