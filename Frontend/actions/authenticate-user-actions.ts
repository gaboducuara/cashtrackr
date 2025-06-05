"use server"

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ErrorResponseSchema, LoginSchema } from '../src/schemas/index';
type ActionStateType = {
  errors: string[]
}
export async function authenticate(prevState: ActionStateType, formData: FormData) {
  // Credenciales de email y password para el login
  const loginCredentials = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  //Validar el loginCredentials con las validaciones.
  const auth = LoginSchema.safeParse(loginCredentials)
  if (!auth.success) {
    return {
      errors: auth.error.errors.map(issue => issue.message)
    }
  }

  const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: auth.data.password,
      email: auth.data.email
    })
  })

  const json = await req.json()
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error]
    }
  }

  // Setear Cookies
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'CASHTRACKR_TOKEN',
    value: json,
    httpOnly: true,
    path: '/'
});

  redirect('/admin')
}