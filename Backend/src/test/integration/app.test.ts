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
  /*Prueba envio password en formato no valido*/
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
      "name": "gabriel mancilla",
      "password": "gabriel12",
      "email": "gabri@gmail.com"
    }

    const response = await request(app).post('/api/auth/create-account').send(userData)

    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
  /*Cuando un usuario ya se registro y quiere volverse a registrar correctamente*/
  it('deberia retornar codigo 409 cuando el usuario entra en conflicto por que ya esta registrado', async () => {

    const userData = {
      "name": "gabriel mancilla",
      "password": "gabriel12",
      "email": "gabriel1@gmail.com"
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
    expect(response.body).toEqual("Cuenta confirmada correctamente")
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
  it('debe devolver un error 401 si la contraseña es incorrecta', async () => {

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