"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const resend_1 = require("../config/resend");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        await resend_1.resend.emails.send({
            from: 'CashTrackr <onboarding@resend.dev>',
            to: user.email,
            subject: 'Confirma tu cuenta en CashTrackr',
            html: `
        <p>Hola: ${user.name}, has creado tu cuenta correctamente en CashTrackr, ya casi está lista.</p>
        <p>Visita el siguiente enlace para confirmar tu cuenta:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu Cuenta</a>
        <p>Ingresa el siguiente código: <b>${user.token}</b></p>
      `,
        });
    };
    static sendPasswordResetToken = async (user) => {
        await resend_1.resend.emails.send({
            from: 'CashTrackr <onboarding@resend.dev>',
            to: user.email,
            subject: 'CashTrackr - Restablece tu contraseña',
            html: `
        <p>Hola: ${user.name}, has solicitado restablecer tu contraseña.</p>
        <p>Visita el siguiente enlace para generar una nueva:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer Contraseña</a>
        <p>Ingresa el siguiente código: <b>${user.token}</b></p>
      `,
        });
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map