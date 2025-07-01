"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        const email = await nodemailer_1.transport.sendMail({
            from: `'castrackr' <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Confirma tu cuenta en CashTrackr',
            html: ` <p>Hola:  ${user.name}, haz creado tu cuenta correcamente
      en cashtrackr, ya casi esta lista</p>
      <p>visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu Cuenta</a>
      <p>e ingresa el codigo: <b>${user.token}</b><p/>
      `
        });
    };
    static sendPasswordResetToken = async (user) => {
        const email = await nodemailer_1.transport.sendMail({
            from: `'castrackr' <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'CashTrackr - Reestablece tu password',
            html: ` <p>Hola: ${user.name}, has solicitado Reestablecer tu password</p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password"> Reestablecer password </a>
      <p>e ingresa el codigo: <b>${user.token}</b><p/>
      `
        });
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map