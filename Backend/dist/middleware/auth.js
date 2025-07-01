"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticated = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const e = new Error('no Autorizado.');
        res.status(401).json({ error: e.message });
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        const e = new Error('token no encontrado.');
        res.status(404).json({ error: e.message });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.id) {
            req.user = await User_1.default.findByPk(decoded.id, {
                attributes: ["id", "name", "email"]
            });
            next();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Token no valido' });
    }
};
exports.authenticated = authenticated;
//# sourceMappingURL=auth.js.map