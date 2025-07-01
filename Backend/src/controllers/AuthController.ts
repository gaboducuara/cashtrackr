import type { Request, Response } from 'express';
import User from '../models/User';
import { hasPassword, checkPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';
import { generateJWT } from '../utils/jwt';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      const error = new Error('Usuario con ese email ya esta registrado.')
      res.status(409).json({ error: error.message });
      return
    }
    try {
      const user = await User.create(req.body)
      user.password = await hasPassword(password)
      const token = generateToken()
      user.token = token;
      if (process.env.NODE_ENV !== 'production') {
        globalThis.cashTrackrConfirmationToken = token
      }
      await user.save()
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
      })
      res.status(201).json('Cuenta creada correctamente.');
      return
    } catch (error) {
      res.status(500).json({ error: 'Error en la creacion de usuario.' });
      return
    }
  }
  public static readonly ConfirmedAccount = async (req: Request, res: Response) => {
    const { token } = req.body
    try {
      const user = await User.findOne({ where: { token } })
      if (!user) {
        const e = new Error('token no es Valido.')
        res.status(401).json({ error: e.message });
        return
      }

      user.confirmed = true
      user.token = null
      await user.save()

      res.status(200).json('Cuenta confirmada correctamente.');
      return
    } catch (error) {
      const e = new Error('Existe Error en la Creacion de la Cuenta.')
      res.status(401).json({ error: e.message });
      return
    }
  }
  static Login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const e = new Error('Usuario no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    if (!user.confirmed) {
      const e = new Error('La Cuenta no ha sido Confirmada.')
      res.status(403).json({ error: e.message });
      return
    }
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const error = new Error('Password Incorrecto.')
      res.status(401).json({ error: error.message });
      return
    }
    const token = generateJWT(user.id)
    res.status(200).json(token)
    return
  }
  static forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const e = new Error('Usuario no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    user.token = generateToken()
    await user.save()
    await AuthEmail.sendPasswordResetToken({
      name: user.name,
      email: user.email,
      token: user.token
    })
    res.json('Revisa tu Email, para instrucciones.')
    return
  }
  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body
    const tokenExist = await User.findOne({ where: { token } })
    if (!tokenExist) {
      const e = new Error('token no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    res.json('Token valido, Asigna una nueva contraseña.')
  }
  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body
    const user = await User.findOne({ where: { token } })
    if (!user) {
      const e = new Error('token no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    user.password = await hasPassword(password)
    user.token = null
    await user.save()
    res.status(200).json('La contraseña se modifico correctamente.')
    return
  }
  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }
  static updateCurrencyUserPassword = async (req: Request, res: Response) => {
    const { currentPassword, password } = req.body
    const { id } = req.user
    const user = await User.findByPk(id)
    const isPasswordCorrect = await checkPassword(currentPassword, user.password)
    if (!isPasswordCorrect) {
      const e = new Error('El password actual es incorrecto.')
      res.status(404).json({ error: e.message });
      return
    }
    user.password = await hasPassword(password)
    await user.save()
    res.json('La contraseña se modifico correctamente.')
    return
  }
  static checkpassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)

    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const e = new Error('El password actual es incorrecto.')
      res.status(401).json({ error: e.message });
      return
    }
    res.json('Password Correcto.')
    return
  }
  static updateUser = async (req: Request, res: Response) => {
    const { name, email } = req.body

    try {
      const existingUser = await User.findOne({ where: { email } })

      if (existingUser && existingUser.id !== req.user.id) {
        const error = new Error('Ese email ya está registrado por otro usuario')
        res.status(409).json({ error: error.message })
        return
      }

      await User.update({ email, name }, {
        where: { id: req.user.id }
      })

      res.json('Perfil actualizado correctamente')
      return
    } catch (error) {
      res.status(500).json('Hubo un error')
      return
    }
  }
}






