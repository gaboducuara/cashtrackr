"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from '../src/schemas/index';

type ActionStateType = {
  errors: string[],
  success: string
}

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  }
  //Validar con zod
  // esta parte del codigo nos muestra en consola los errores generados al llenar mal el formulario pero tambien, nos muestra el objeto del formulario cuando esta bien llenado.
  const register = RegisterSchema.safeParse(registerData)
  // se verifica si existe errores y cae en el retur de lo contrario el flujo del objeto sigue
  if (!register.success) {
    const errors = register.error.errors.map(error => error.message)
    return {
      errors: errors,
      success: prevState.success
    }
  }
  //registrar el usuario
  const url = `${process.env.API_URL}/auth/create-account`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password
    })
  })

  const json = await req.json()
  if(req.status === 409){
    const {error} = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
    success: ''
    }
  }

  const success = SuccessSchema.parse(json)
  return {
    errors: [],
    success
  }
}