import { createRequest, createResponse } from 'node-mocks-http'
import { AuthController } from '../../../controllers/AuthController'
import User from '../../../models/User'
import { checkPassword, hasPassword } from '../../../utils/auth'
import { generateToken } from '../../../utils/token'
import { AuthEmail } from '../../../emails/AuthEmail'
import { generateJWT } from '../../../utils/jwt'

//prueba hacia presupuestos
/*Moking automatico*/
jest.mock('../../../models/User')
jest.mock('../../../utils/auth')
jest.mock('../../../utils/token')
jest.mock('../../../utils/jwt')

//Pruebas unitarias
describe('AuthController.createAccount', () => {
  beforeEach(() => {
    jest.resetAllMocks() /*Reinicia todos los mocks antes de cada prueba test*/
  })
  /*Cuando un usuario ya existe en la base de datos*/
  it('Debe retornar un status 409 y retornar un mensaje de error si el correo esta registrado', async () => {
    //Forzamos de que un usuario si existe en la base de datos
    (User.findOne as jest.Mock).mockResolvedValue(true)
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/create-account',
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    })
    const res = createResponse()
    await AuthController.createAccount(req, res)
    expect(res.statusCode).toBe(409)
    expect(res._getJSONData()).toHaveProperty('error', 'Un usuario con ese email ya esta registrado.')
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@test.com' } })
    expect(User.findOne).toHaveBeenCalled()
    expect(User.findOne).toHaveBeenCalledTimes(1)
  })
  /*Cuando un usuario no existe en la base de datos*/
  it('simular el hashPassword. usuario debe debe de existir. existir generate token. funcionar el save. simular que se envia el email, tener una respuesta status 200 con su respectivo mensaje', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null)
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/create-account',
      body: {
        email: 'test@test.com',
        password: 'password',
        name: 'Test name'
      }
    })
    const res = createResponse()
    const mockUser = {
      ...req.body,
      save: jest.fn()
    };

    (User.create as jest.Mock).mockResolvedValue(mockUser);
    (hasPassword as jest.Mock).mockResolvedValue('hashedPassword'); /*mockResolvedValue es para operaciones asincronas*//*Simulacion de un Hash de password*/
    (generateToken as jest.Mock).mockReturnValue('token123456'); /*mockReturnValue es para operaciones sincronas.*/ /*Validamos la Generacion de Token*/
    jest.spyOn(AuthEmail, "sendConfirmationEmail").mockImplementation(() => Promise.resolve()); /*Simulacion de envio de email*/ /*es una forma en la que puedes esperar a que se ejecute un codigo y entonces se puede modificar su comportamiento*/

    await AuthController.createAccount(req, res);

    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockUser.password).toBe('hashedPassword');
    expect(mockUser.token).toBe('token123456')
    expect(res.statusCode).toBe(201); /*Aqui revisa que el llamado sea con user.save() pero se ha utilizado el mockUser*/
    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      token: 'token123456'
    })
    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledTimes(1)
  })
})
describe('AuthController.Login', () => {
  it('Deberia retornar 404 si el usuario no es encontrado', async () => {
    //Forzamos de que un usuario si existe en la base de datos
    (User.findOne as jest.Mock).mockResolvedValue(null)
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    })
    const res = createResponse()
    await AuthController.Login(req, res)
    expect(res.statusCode).toBe(404)
    expect(res._getJSONData()).toHaveProperty('error', 'Usuario no encontrado.')
  })
  it('Deberia retornar 403 si la cuenta no ha sido confirmada', async () => {
    //Forzamos de que un usuario si existe en la base de datos
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: "password",
      confirmed: false
    })
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    })
    const res = createResponse()
    await AuthController.Login(req, res)
    expect(res.statusCode).toBe(403)
    expect(res._getJSONData()).toHaveProperty('error', 'La Cuenta no ha sido Confirmada.')
  })
  it('Deberia retornar 401 si la contraseña es incorrecta', async () => {
    const userMock = {
      id: 1,
      email: "test@test.com",
      password: "password",
      confirmed: true
    };
    (User.findOne as jest.Mock).mockResolvedValue(userMock)
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    })
    const res = createResponse();

    (checkPassword as jest.Mock).mockResolvedValue(false);

    await AuthController.Login(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toHaveProperty('error', 'Password Incorrecto.');
    expect(checkPassword).toHaveBeenCalledWith(req.body.password, userMock.password);
    expect(checkPassword).toHaveBeenCalledTimes(1);
  })
  it('Deberia retornar JWT si la authenticacion es satisfactoria', async () => {
    const userMock = {
      id: 1,
      email: "test@test.com",
      password: "password",
      confirmed: true
    };
    //Forzamos de que un usuario si existe en la base de datos
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'test@test.com',
        password: 'password'
      }
    })
    const res = createResponse();

    const fakeJWT = 'fake_jwt';

    (User.findOne as jest.Mock).mockResolvedValue(userMock);
      (checkPassword as jest.Mock).mockResolvedValue(true);
    (generateJWT as jest.Mock).mockReturnValue(fakeJWT);

    await AuthController.Login(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(fakeJWT);
    expect(generateJWT).toHaveBeenCalledTimes(1)
    expect(generateJWT).toHaveBeenCalledWith(userMock.id)
  })
})