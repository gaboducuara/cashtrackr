import { z } from 'zod';

//Schema para validar el registro de usuario
export const RegisterSchema = z.object({
  email: z.string()
    //El email no debe estar vacio
    .min(1, { message: 'El email es obligatorio' })
    //El email debe tener el formato de email
    .email({ message: 'Email no valido' }),
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
  password_confirmation: z.string(),
  //El metodo refine sirve para validar que La contraseña de confirmacion no debe estar vacia
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation'],
})

//Schema para validar el login de usuario
export const LoginSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
  password: z.string()
    .min(1, { message: 'La contraseña no puede ir vacio' })
})

//Schema por si existen errores en el Token
export const ErrorResponseSchema = z.object({
  error: z.string()
})
export const TokenSchema = z.string({ message: 'Token no valido.' }).length(6, { message: 'El token debe tener 6 caracteres.' })
export const ForgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
})

//Schema de zod para validaciones de la contraseña y la validacion de la contraseña
export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: 'La contraseña debe ser de al menos 8 caracteres.' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no son iguales.",
  path: ["password_confirmation"]
});

//Schema sobre Presupuesto
export const DraftBudgetSchema = z.object({
  name: z.string()
    .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce.
    number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
})
export const PasswordValidationSchema = z.string().min(1, { message: 'Contraseña no válido' })
export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: 'El nombre del gasto es obligatorio' }),
  amount: z.coerce.number().min(1, { message: 'Cantidad no válida' })
})
export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'La Contraseña no puede ir vacio' }),
  password: z.string()
    .min(8, { message: 'La nueva contraseña debe ser de al menos 8 caracteres' }),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no son iguales",
  path: ["password_confirmation"]
});
export const ProfileFormSchema = z.object({
  name: z.string()
    .min(1, { message: 'Tu Nombre no puede ir vacio' }),
  email: z.string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
})

//Schema para validar el success
export const SuccessSchema = z.string()

//Validacion de usuario
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})
export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number()
})
export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema)
})
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({ expenses: true }))
export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type DraftExpense = z.infer<typeof DraftExpenseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>
