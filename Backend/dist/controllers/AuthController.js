"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const token_1 = require("../utils/token");
const AuthEmail_1 = require("../emails/AuthEmail");
const jwt_1 = require("../utils/jwt");
class AuthController {
    static createAccount = async (req, res) => {
        const { email, password } = req.body;
        const userExists = await User_1.default.findOne({ where: { email } });
        if (userExists) {
            const error = new Error('Usuario con ese email ya esta registrado.');
            res.status(409).json({ error: error.message });
            return;
        }
        try {
            const user = await User_1.default.create(req.body);
            user.password = await (0, auth_1.hasPassword)(password);
            const token = (0, token_1.generateToken)();
            user.token = token;
            if (process.env.NODE_ENV !== 'production') {
                globalThis.cashTrackrConfirmationToken = token;
            }
            await user.save();
            await AuthEmail_1.AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            });
            res.status(201).json('Cuenta creada correctamente.');
            return;
        }
        catch (error) {
            res.status(500).json({ error: 'Error en la creacion de usuario.' });
            return;
        }
    };
    static ConfirmedAccount = async (req, res) => {
        const { token } = req.body;
        try {
            const user = await User_1.default.findOne({ where: { token } });
            if (!user) {
                const e = new Error('token no es Valido.');
                res.status(401).json({ error: e.message });
                return;
            }
            user.confirmed = true;
            user.token = null;
            await user.save();
            res.status(200).json('Cuenta confirmada correctamente.');
            return;
        }
        catch (error) {
            const e = new Error('Existe Error en la Creacion de la Cuenta.');
            res.status(401).json({ error: e.message });
            return;
        }
    };
    static Login = async (req, res) => {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            const e = new Error('Usuario no encontrado.');
            res.status(404).json({ error: e.message });
            return;
        }
        if (!user.confirmed) {
            const e = new Error('La Cuenta no ha sido Confirmada.');
            res.status(403).json({ error: e.message });
            return;
        }
        const isPasswordCorrect = await (0, auth_1.checkPassword)(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error('Password Incorrecto.');
            res.status(401).json({ error: error.message });
            return;
        }
        const token = (0, jwt_1.generateJWT)(user.id);
        res.status(200).json(token);
        return;
    };
    static forgotPassword = async (req, res) => {
        const { email } = req.body;
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            const e = new Error('Usuario no encontrado.');
            res.status(404).json({ error: e.message });
            return;
        }
        user.token = (0, token_1.generateToken)();
        await user.save();
        await AuthEmail_1.AuthEmail.sendPasswordResetToken({
            name: user.name,
            email: user.email,
            token: user.token
        });
        res.json('Revisa tu Email, para instrucciones.');
        return;
    };
    static validateToken = async (req, res) => {
        const { token } = req.body;
        const tokenExist = await User_1.default.findOne({ where: { token } });
        if (!tokenExist) {
            const e = new Error('token no encontrado.');
            res.status(404).json({ error: e.message });
            return;
        }
        res.json('Token valido, Asigna una nueva contraseña.');
    };
    static resetPasswordWithToken = async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User_1.default.findOne({ where: { token } });
        if (!user) {
            const e = new Error('token no encontrado.');
            res.status(404).json({ error: e.message });
            return;
        }
        user.password = await (0, auth_1.hasPassword)(password);
        user.token = null;
        await user.save();
        res.status(200).json('La contraseña se modifico correctamente.');
        return;
    };
    static user = async (req, res) => {
        res.json(req.user);
    };
    static updateCurrencyUserPassword = async (req, res) => {
        const { currentPassword, password } = req.body;
        const { id } = req.user;
        const user = await User_1.default.findByPk(id);
        const isPasswordCorrect = await (0, auth_1.checkPassword)(currentPassword, user.password);
        if (!isPasswordCorrect) {
            const e = new Error('El password actual es incorrecto.');
            res.status(404).json({ error: e.message });
            return;
        }
        user.password = await (0, auth_1.hasPassword)(password);
        await user.save();
        res.json('La contraseña se modifico correctamente.');
        return;
    };
    static checkpassword = async (req, res) => {
        const { password } = req.body;
        const { id } = req.user;
        const user = await User_1.default.findByPk(id);
        const isPasswordCorrect = await (0, auth_1.checkPassword)(password, user.password);
        if (!isPasswordCorrect) {
            const e = new Error('El password actual es incorrecto.');
            res.status(401).json({ error: e.message });
            return;
        }
        res.json('Password Correcto.');
        return;
    };
    static updateUser = async (req, res) => {
        const { name, email } = req.body;
        try {
            const existingUser = await User_1.default.findOne({ where: { email } });
            if (existingUser && existingUser.id !== req.user.id) {
                const error = new Error('Ese email ya está registrado por otro usuario');
                res.status(409).json({ error: error.message });
                return;
            }
            await User_1.default.update({ email, name }, {
                where: { id: req.user.id }
            });
            res.json('Perfil actualizado correctamente');
            return;
        }
        catch (error) {
            res.status(500).json('Hubo un error');
            return;
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map