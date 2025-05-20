import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
//validar que el usuario este autenticado
export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  //validacion de bearer
  const bearer = req.headers.authorization
  if (!bearer) {
    const e = new Error('no Autorizado.')
    res.status(401).json({ error: e.message });
    return
  }
  const [, token] = bearer.split(' ')
  //validacion de token
  if (!token) {
    const e = new Error('token no encontrado.')
    res.status(404).json({ error: e.message });
    return
  }
  // Verificacion del Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'object' && decoded.id) {
      req.user = await User.findByPk(decoded.id, {
        attributes: ["id", "name", "email"]
      })
      next()
    }
  } catch (error) {
    res.status(500).json({ error: 'Token no valido'})
  }
}