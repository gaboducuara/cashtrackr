import type { Request, Response } from 'express';
import User from '../models/User';
import { hasPassword, checkPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';
import { generateJWT } from '../utils/jwt';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    /*Validar si el email ya existe en la base de datos */
    const userExists = await User.findOne({ where: { email } })
    /*Prevenir Usuarios Duplicados*/
    if (userExists) {
      const error = new Error('Usuario con ese email ya esta registrado.')
      res.status(409).json({ error: error.message });
      return
    }
    try {
      const user = await User.create(req.body)
      /*Hash de password*/
      user.password = await hasPassword(password)
      /*generando token*/
      const token = generateToken()
      user.token = token;
      /*Objeto Global de node*/
      if (process.env.NODE_ENV !== 'production') {
        globalThis.cashTrackrConfirmationToken = token
      }
      await user.save()
      /*Envio de email*/
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
  /*Confirmar Cuenta*/
  public static readonly ConfirmedAccount = async (req: Request, res: Response) => {
    /*Confirmar Cuenta se usuario*/
    const { token } = req.body
    /*Validar si el token existe en la base de datos*/
    try {
      const user = await User.findOne({ where: { token } })
      if (!user) {
        const e = new Error('token no es Valido.')
        res.status(401).json({ error: e.message });
        return
      }
      user.confirmed = true
      /*invalidar token una ves confirmado*/
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
    /*Validar si el email ya existe en la base de datos*/
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const e = new Error('Usuario no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    /*Verificar si la cuenta esta confirmada*/
    if (!user.confirmed) {
      const e = new Error('La Cuenta no ha sido Confirmada.')
      res.status(403).json({ error: e.message });
      return
    }
    /*Verificar si el password es correcto*/
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const e = new Error('Password Incorrecto.')
      res.status(401).json({ error: e.message });
      return
    }
    /**/
    const token = generateJWT(user.id)
    res.status(200).json(token)
    return
  }
  /*forgot-password, Contraseña Olvidada*/
  static forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body
    /*Revisar si el usuario existe*/
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const e = new Error('Usuario no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    user.token = generateToken()
    await user.save()
    /*Envio de mensaje en el reseteo de contraseña*/
    await AuthEmail.sendPasswordResetToken({
      name: user.name,
      email: user.email,
      token: user.token
    })
    res.json('Revisa tu Email, para instrucciones.')
    return
  }
  /*Validacion de token*/
  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body
    /*Revisar si el token existe*/
    const tokenExist = await User.findOne({ where: { token } })
    if (!tokenExist) {
      const e = new Error('token no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    res.json('Token valido...')
  }
  /*Validar token y validar password y volver a hasheard*/
  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body
    /*Revisar si el token existe*/
    const user = await User.findOne({ where: { token } })
    if (!user) {
      const e = new Error('token no encontrado.')
      res.status(404).json({ error: e.message });
      return
    }
    /*Asignar el nuevo password o hashear password*/
    user.password = await hasPassword(password)
    /*invalidando token para que el usuario no vuelva a usarlo*/
    user.token = null
    await user.save()
    res.status(200).json('El password se modifico correctamente')
    return
  }
  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }
  /*usuario quiere cambiar o actualizar la contraseña*/
  static updateCurrencyUserPassword = async (req: Request, res: Response) => {
    const { currentPassword, password } = req.body
    const { id } = req.user
    const user = await User.findByPk(id)
    /*validando si es password actual es correcto*/
    const isPasswordCorrect = await checkPassword(currentPassword, user.password)
    if (!isPasswordCorrect) {
      const e = new Error('El password actual es incorrecto.')
      res.status(404).json({ error: e.message });
      return
    }
    /*si pasa la validacion es decir "isPasswordCorrect" aca se debe hashear de nuevo la contraseña*/
    user.password = await hasPassword(password)
    await user.save()
    res.json('El password se modifico correctamente')
    return
  }
  /*Revisar si el password es correcto*/
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
}






