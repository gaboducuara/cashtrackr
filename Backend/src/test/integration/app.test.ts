import request from 'supertest';
import app from '../../server';
import { AuthController } from '../../controllers/AuthController';
import User from '../../models/User';
import * as authUtils from '../../utils/auth';
import * as jwtUtils from '../../utils/jwt'

/*Prueba de formulario vacio*/
describe('Authenticacion - Create Account', () => {
  it('debe mostrar errores de validación cuando el formulario está vacío', async () => {
    const response = await request(app).post('/api/auth/create-account').send({})
    const createAccountMock = jest.spyOn(AuthController, 'createAccount')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

    expect(response.status).not.toBe(201)
    expect(response.body.errors).not.toHaveLength(2)
    expect(createAccountMock).not.toHaveBeenCalled() /*probamos que la funcion createAccount no se mande a llamar*/
  })
  /*Prueba envio email en formato no valido*/
  it('deberia retornar el codigo 400 Cuando el email no es valido', async () => {
    const response = await request(app).post('/api/auth/create-account').send({
      "name": "pepe",
      "password": "gabrielmancilla",
      "email": "not_valid_email"
    })
    const createAccountMock = jest.spyOn(AuthController, 'createAccount')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('El email no es valido.')

    expect(response.status).not.toBe(201)
    expect(response.body.errors).not.toHaveLength(2)
    expect(createAccountMock).not.toHaveBeenCalled() /*probamos que la funcion createAccount no se mande a llamar*/
  })
  /*Prueba envio password  debe tener al menos 8 caracteres y su mensaje de error "formato no valido"*/
  it('deberia retornar codigo 400 cuando la contraseña es inferior a 8 caracteres.', async () => {
    const response = await request(app).post('/api/auth/create-account').send({
      "name": "pepe",
      "password": "gabriel",
      "email": "test@test.com"
    })
    const createAccountMock = jest.spyOn(AuthController, 'createAccount')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('El password debe tener al menos 8 caracteres.')

    expect(response.status).not.toBe(201)
    expect(response.body.errors).not.toHaveLength(2)
    expect(createAccountMock).not.toHaveBeenCalled() /*probamos que la funcion createAccount no se mande a llamar*/
  })
  /*Prueba cuando se ingresa un usuario correctamente a la base de datos*/
  it('deberia retornar codigo 201 cuando el usuario se creo en la base de datos correctamente.', async () => {

    const userData = {
      "name": "Gabriel",
      "password": "duna1233456",
      "email": "gabriel@test.com"
    }

    const response = await request(app).post('/api/auth/create-account')
      .send(userData)

    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')

  })
  /*Cuando un usuario ya se registro y quiere volverse a registrar correctamente*/
  it('deberia retornar codigo 409 cuando el usuario entra en conflicto por que ya esta registrado', async () => {

    const userData = {
      "name": "Gabriel",
      "password": "duna1233456",
      "email": "gabriel@test.com"
    }

    const response = await request(app).post('/api/auth/create-account').send(userData);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Un usuario con ese email ya esta registrado.');
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(201);
    expect(response.body).not.toHaveProperty('errors');
  })
})
describe('Authentication - Account Confirmation with Token', () => {
  it('debe mostrar un error si el token está vacío o no es valido', async () => {
    const response = await request(app).post('/api/auth/confirm-account').send({ token: 'not_valid' })

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('El token no es Valido.')
  })
  it('debe mostrar error si el token no existe', async () => {
    const response = await request(app)
      .post('/api/auth/confirm-account')
      .send({
        token: "123456"
      })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('El token no es Valido.')
    expect(response.status).not.toBe(200)
  })
  it('debe confirmar la cuenta con un token válido', async () => {
    const token = globalThis.cashTrackrConfirmationToken

    const response = await request(app)
      .post('/api/auth/confirm-account')
      .send({ token })

    expect(response.status).toBe(200)
    expect(response.body).toEqual("Cuenta confirmada correctamente.")
    expect(response.status).not.toBe(401)
  })
})
describe('Authentication - Login', () => {
  /*quitar los mocks previos para que el contador reinicie de nuevo*/
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /*Prueba de formulario cuando se manda vacio*/
  it('debe mostrar errores de validación cuando el formulario está vacío', async () => {
    const response = await request(app).post('/api/auth/login').send({});
    /*asi se realiza el no llamado de AuthController.Login */
    const loginMock = jest.spyOn(AuthController, 'Login')

    expect(response.status).not.toBe(200)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2) /*Esto revisa la cantidad de errores que existen*/
    expect(response.body.errors).not.toHaveLength(1)
    expect(loginMock).not.toHaveBeenCalled()
  })
  /*Probar Cuando enviamos un Email no valido*/
  it('debe devolver 400 bad request cuando el email no es válido', async () => {
    const response = await request(app).post('/api/auth/login').send({ "password": "password", "email": "not_valid_email" });
    /*asi se realiza el no llamado de AuthController.Login */
    const loginMock = jest.spyOn(AuthController, 'Login')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1) /*Esto revisa la cantidad de errores que existen*/
    expect(loginMock).not.toHaveBeenCalled()
    expect(response.body.errors[0].msg).toBe('El email no es valido.')
    expect(response.body.errors).not.toHaveLength(2)
    expect(loginMock).not.toHaveBeenCalled()

  })

  it('debe devolver error 404 si el usuario no existe', async () => {
    const response = await request(app).post('/api/auth/login').send({ "password": "password", "email": "user@test.com" });

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Usuario no encontrado.')
    expect(response.body.error).not.toHaveLength(2)
    expect(response.status).not.toBe(200)
  })

  /*Usuario que no ha confirmado la cuenta*/
  it('debe devolver error 403 si la cuenta de usuario no es confirmada', async () => {

    (jest.spyOn(User, 'findOne') as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: false,
      email: "user_not_confirmed@test.com",
      password: "hashedpassword",
    })

    const response = await request(app).post('/api/auth/login').send({ "password": "password", "email": "user@test.com" });

    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('La Cuenta no ha sido Confirmada.')
    expect(response.body.error).not.toHaveLength(2)
    expect(response.status).not.toBe(200)
    expect(response.status).not.toBe(404)
  })

  /*Segunda forma de como hacer que un usuario no haya confirmado la cuenta*/
  it('debe devolver error 403 si la cuenta de usuario no es confirmada', async () => {

    const userData = {
      name: "Test",
      password: "password",
      email: "user@test.com"
    }

    await request(app).post('/api/auth/create-account').send(userData)

    const response = await request(app).post('/api/auth/login').send({ "password": userData.password, "email": userData.email });

    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('La Cuenta no ha sido Confirmada.')
    expect(response.body.error).not.toHaveLength(2)
    expect(response.status).not.toBe(200)
    expect(response.status).not.toBe(404)
  })
  /*Password que sea incorrecto*/
  it('debe devolver un error 401 si la contraseña es incorrecta', async () => {

    const findOne = (jest.spyOn(User, 'findOne') as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: true,
      password: "hashedpassword",
    })

    const checkPassword = jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(false)

    const response = await request(app).post('/api/auth/login').send({ "password": "password1", "email": "test@test.com" });

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Password Incorrecto.')
    expect(response.body.error).not.toHaveLength(2)
    expect(response.status).not.toBe(200)
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(403)
    /*confirmar que el findOne sea mandado a llamar 1 vez*/
    expect(findOne).toHaveBeenCalledTimes(1)
    /*confirmar que el checkpassword sea mandado a llamar 1 vez*/
    expect(checkPassword).toHaveBeenCalledTimes(1)
  })
  /*Validar un login exitoso y validar un JWT*/
  it('debe devolver un error 401 si la contraseña es incorrecta y JWT incorrecto', async () => {

    const findOne = (jest.spyOn(User, 'findOne') as jest.Mock).mockResolvedValue({
      id: 1,
      confirmed: true,
      password: "hashedpassword",
    })

    const checkPassword = jest.spyOn(authUtils, 'checkPassword').mockResolvedValue(true) /*ponerlo en true para validar que el password es valido*/
    const generateJWT = jest.spyOn(jwtUtils, 'generateJWT').mockReturnValue('jwt_token')
    const response = await request(app).post('/api/auth/login').send({ "password": "password1", "email": "test@test.com" });

    expect(response.status).toBe(200)
    expect(response.body).toEqual('jwt_token')

    expect(findOne).toHaveBeenCalled()
    expect(findOne).toHaveBeenCalledTimes(1)

    expect(checkPassword).toHaveBeenCalled();
    expect(checkPassword).toHaveBeenCalledTimes(1);
    expect(checkPassword).toHaveBeenCalledWith('password1', 'hashedpassword')

    expect(generateJWT).toHaveBeenCalled();
    expect(generateJWT).toHaveBeenCalledTimes(1);
    expect(generateJWT).toHaveBeenCalledWith(1);
  })
})

let jwt: string
async function authenticateUser() {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: "gabriel@test.com",
      password: "duna1233456"
    })
  jwt = response.body
  expect(response.status).toBe(200)
}
describe('GET /api/budget', () => {

  beforeAll(() => {
        jest.restoreAllMocks()
    })
  beforeAll(async () => {
    await authenticateUser()
  })
  /*Cuando el token no es valido*/
  it('debe rechazar el acceso a los presupuestos por que no existe el jwt', async () => {
    const response = await request(app)
      .get('/api/budget')

    expect(response.status).toBe(401) /*Codigo 401 al no poder usar el jwt y no poder autenticarse*/
    expect(response.body.error).toBe('no Autorizado.')
  })
  it('debe rechazar el acceso  a los presupuestos, ya que el jwt no es similar, entonces por defecto no es valido', async () => {
    const response = await request(app)
      .get('/api/budget')
      .auth('not_valid', { type: 'bearer' })

    expect(response.status).toBe(500)
    expect(response.body.error).toBe('Token no valido')
  })
  it('debe permitir el acceso autenticado a los presupuestos con un jwt válido', async () => {
    const response = await request(app)
      .get('/api/budget')
      .auth(jwt, { type: 'bearer' })
    expect(response.body).toHaveLength(0)
    expect(response.status).not.toBe(401)
    expect(response.body.error).not.toBe('no Autorizado.')
  })
})
describe('POST /api/budget', () => {
  beforeAll(async () => {
    await authenticateUser()
  })
  it('debe rechazar las peticiones post de presupuestos cuando esta  un jwt', async () => {
    const response = await request(app)
      .post('/api/budget')

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('no Autorizado.')
  })
  it('debe mostrar la validación cuando el formulario se envía con datos no válidos', async () => {
    const response = await request(app)
      .post('/api/budget')
      .auth(jwt, { type: 'bearer' })
      .send({})

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(5)
  })
  it('debe retornar un nuevo presupuesto y status exitoso.', async () => {
    const response = await request(app)
      .post('/api/budget')
      .auth(jwt, { type: 'bearer' })
      .send({
        "name": "Bautizo",
        "amount": 1000000,
      })

    expect(response.status).toBe(201)
    expect(response.body).toBe("Presupuesto Creado Correctamente.")
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })
})

/*Obtener un presupuesto por su iD */
describe('GET /api/budget/:id', () => {
  beforeAll(async () => {
    await authenticateUser()
  })
  it('debe rechazar la solicitud get no autenticada al identificador de presupuesto sin un jwt', async () => {
    const response = await request(app)
      .get('/api/budget/1')

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('no Autorizado.')
  })
  /*Validar URL cuando queremos acceder a un presupuesto*/
  it('debería devolver 400 solicitud errónea cuando el id no es válido', async () => {
    const response = await request(app)
      .get('/api/budget/not_valid')
      .auth(jwt, { type: 'bearer' })

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined() /*si sabes que existen errores pero no deceas saber cuantos errores hay estos metodos sirven para saber cuantos errores hay en la respuesta o contenido*/
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no valido, debe ser un numero entero')
    expect(response.status).not.toBe(401)
    expect(response.body.error).not.toBe('no Autorizado.')
  })
  /*Si un presupuesto no existe se maneje correctamente*/
  it('debe devolver 404 no encontrado cuando un presupuesto no existe', async () => {
    const response = await request(app)
      .get('/api/budget/3000')
      .auth(jwt, { type: 'bearer' })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Presupuesto no ha sido encontrado.')
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })
  /*Retornar presupuesto cuando el usuario fue el que lo creo, cuando esta autenticado, cuando existe, cuando es valido*/
  it('debe devolver un único presupuesto por id', async () => {

    const response = await request(app)
      .get('/api/budget/1')
      .auth(jwt, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
    expect(response.status).not.toBe(404)
  })
})
describe('PUT /api/budget/:id', () => {
  beforeAll(async () => {
    await authenticateUser()
  })

  it('debe rechazar una solicitud de actualizacion al no estar autenticado con un JWT', async () => {
    const response = await request(app)
      .put('/api/budget/1')

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('no Autorizado.')
  })
  it('debe mostrar errores de validación si el formulario está vacío', async () => {
    const response = await request(app)
      .put('/api/budget/1')
      .auth(jwt, { type: 'bearer' })
      .send({})

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(5)
  })
  it('debe actualizar un presupuesto por id y devolver un mensaje de éxito', async () => {
    const response = await request(app)
      .put('/api/budget/1')
      .auth(jwt, { type: 'bearer' })
      .send({
        name: "Bautizo",
        amount: 300
      })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Presupuesto actualizado correctamente.')
  })
})
describe('DELETE /api/budget/:id', () => {
  beforeAll(async () => {
    await authenticateUser()
  })
  it('debe rechazar una solicitud put no autenticada a budget id sin un jwt', async () => {
    const response = await request(app)
      .delete('/api/budget/1')

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('no Autorizado.')
  })

  it('debe devolver 404 no encontrado cuando un presupuesto no existe', async () => {
    const response = await request(app)
      .delete('/api/budget/3000')
      .auth(jwt, { type: 'bearer' })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Presupuesto no ha sido encontrado.')
  })
  it('debe eliminar un presupuesto y devolver un mensaje de éxito', async () => {
    const response = await request(app)
      .delete('/api/budget/1')
      .auth(jwt, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.body).toBe('Presupuesto Eliminado.')
  })

})






