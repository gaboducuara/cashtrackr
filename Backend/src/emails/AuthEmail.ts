import { transport } from '../config/nodemailer'
type EmailType = {
  name: string
  email: string
  token: string
}
export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'castrackr <admin@cashtrackr.com>',
      to: user.email,
      subject: 'Confirma tu cuenta en CashTrackr',
      html: ` <p>Hola: ${user.name}, haz creado tu cuenta correcamente
      en cashtrackr, ya casi esta lista</p>
      <p>visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu Cuenta</a>
      <p>e ingresa el codigo: <b>${user.token}</b><p/>
      `
    })
  }
  /*Construccion del mensaje de Reseteo de Contraseña*/
  static sendPasswordResetToken = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'castrackr <admin@cashtrackr.com>',
      to: user.email,
      subject: 'CashTrackr - Reestablece tu password',
      html: ` <p>Hola: ${user.name}, has solicitado Reestablecer tu password</p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/reset-password> Reestablecer password </a>
      <p>e ingresa el codigo: <b>${user.token}</b><p/>
      `
    })
  }
}