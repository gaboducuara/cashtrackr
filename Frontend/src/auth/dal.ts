// "dal" -> data access layer - Esta capa sirve para verificar que un usuario tiene acceso a un recurso.
import "server-only"
import { cache } from 'react'
import { redirect } from "next/navigation"
import getToken from './token'
import { UserSchema } from '../schemas'
// El cache sirve para reutilizar la funcion y no tener que volver a hacer la peticion a la API cada vez que se llama a esta funcion
// El cache es una funcion que se ejecuta una sola vez y guarda el resultado en memoria, por lo que no se vuelve a ejecutar hasta que se reinicie el servidor
export const verifySession = cache( async () => {
  //De esta forma se controla la pagina de admin, es decir se redirecciona todo usuario que no este logueado o que en su ordenador no tenga el token y ademas de eso que no tenga la cookie "CASHTRACKR_TOKEN". -> nota: debe tener token y cookie para ver las funcionalidades de toda la pagina
  const token = getToken()
  if(!token) {
      redirect('/auth/login')
  }

  const url = `${process.env.API_URL}/auth/user`
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const session = await req.json()
  const result = UserSchema.safeParse(session)
  // si no se cumple la validacion se retorna a /auth/login
  if (!result.success) {
    redirect('/auth/login')
  }

  return {
      user: result.data,
      isAuth: true
  }
})