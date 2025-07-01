"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hasPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hasPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(12);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    return hashedPassword;
};
exports.hasPassword = hasPassword;
const checkPassword = async (password, hashedPassword) => {
    return await bcryptjs_1.default.compare(password, hashedPassword);
};
exports.checkPassword = checkPassword;
//# sourceMappingURL=auth.js.map