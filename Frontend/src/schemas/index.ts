import { z } from 'zod';

//Schema para validar el registro de usuario
export const RegisterSchema = z.object({
  email: z.string()
  //El email no debe estar vacio
  .min(1, {message: 'El email es obligatorio'})
  //El email debe tener el formato de email
  .email({message: 'Email no valido'}),
  name: z.string().min(1, {message: 'El nombre es obligatorio'}),
  password: z.string().min(8, {message: 'El password debe tener al menos 8 caracteres.'}),
  password_confirmation: z.string(),
  //El metodo refine sirve para validar que La contraseña de confirmacion no debe estar vacia
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation'],
})

//Schema para validar el success
export const SuccessSchema = z.string()
export const ErrorResponseSchema = z.object({
  error: z.string()
})