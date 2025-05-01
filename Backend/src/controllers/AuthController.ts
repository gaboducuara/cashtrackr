import type { Request, Response } from 'express';
import User from '../models/User';
import { hasPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';
export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    //Validar si el email ya existe en la base de datos
    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      const e = new Error('Un usuario con ese email ya esta registrado.')
      res.status(409).json({ error: e.message });
      return
    }

    try {
      const user = new User(req.body)
      //Hash de password
      user.password = await hasPassword(password)
      //generando token
      user.token = generateToken()
      await user.save()
      // Envio de email
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
      })
      res.status(201).json({ status: 'success', message: 'Usuario creado correctamente.', data: user });
      return
    } catch (error) {
      const e = new Error('Un usuario con ese email ya esta registrado.')
      res.status(409).json({ error: e.message });
      return
    }
  }

  //Confirmar Cuenta
  static ConfirmedAccount = async (req: Request, res: Response) => {
    /*Confirmar Cuenta se usuario*/
    const { token } = req.body
    //Validar si el token existe en la base de datos
    try {
      const user = await User.findOne({ where: { token } })
      if (!user) {
        const e = new Error('El token no es Valido.')
        res.status(401).json({ error: e.message });
        return
      }
      user.confirmed = true
      // invalidar token una ves confirmado
      user.token = null
      await user.save()
      res.status(200).json('Cuenta confirmada correctamente.');
    } catch (error) {
      const e = new Error('Existe Error en la Creacion de la Cuenta.')
        res.status(401).json({ error: e.message });
        return
    }
  }
}