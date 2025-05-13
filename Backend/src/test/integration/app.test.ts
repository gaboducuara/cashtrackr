import request from 'supertest';
import app from '../../server';
import { AuthController } from '../../controllers/AuthController';
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




