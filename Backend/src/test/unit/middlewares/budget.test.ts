import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from '../../mocks/budgets';
import Budget from '../../../models/Budget'
import { hasAcess, validateBudgetExists } from '../../../middleware/budget'

//prueba hacia presupuestos
jest.mock('../../../models/Budget', () => ({
  /*Simulacion de metodos en Sequelize*/
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}))

describe('budget Middlewares - validateBudgetExists', () => {
  it('debe gestionar un presupuesto inexistente', async () => {
    (Budget.findByPk as jest.Mock).mockResolvedValue(null)

    const req = createRequest({
      params: { budgetId: '1' }
    })

    const res = createResponse()
    const next = jest.fn();
    await validateBudgetExists(req, res, next)
    expect(res.statusCode).toBe(404) /*validar el llamado del 404 como error*/
    expect(res._getJSONData()).toEqual({ error: 'Presupuesto no ha sido encontrado.' }) /*Validar que el mensaje de error sea el correcto*/
    expect(next).not.toHaveBeenCalled()/*Validar que el metodo next() no se haya mandando a llamar*/
  })
  it('debe pasar al siguiente middleware si pasa correctamente la validacion del presupuesto', async () => {
    (Budget.findByPk as jest.Mock).mockResolvedValue(budgets[0])

    const req = createRequest({
      params: { budgetId: '1' }
    })

    const res = createResponse()
    const next = jest.fn();
    await validateBudgetExists(req, res, next)
    expect(next).toHaveBeenCalled()
    expect(req.budget).toEqual(budgets[0])
  })
  it('Validar cuando el presupuesto y cae el error en un catch 500', async () => {
    (Budget.findByPk as jest.Mock).mockRejectedValue(new Error) /*Forzando el error para que se vaya a la parte del catch 500 estamos hablando del middleare validateBudgetExists*/

    const req = createRequest({
      params: { budgetId: '1' }
    })

    const res = createResponse()
    const next = jest.fn();
    await validateBudgetExists(req, res, next)

    expect(res.statusCode).toBe(500) /*validar el llamado del 404 como error*/
    expect(res._getJSONData()).toEqual({ error: 'existe error en el presupuesto.' })
    expect(next).not.toHaveBeenCalled()
  })
})
describe('budget Middlewares - hasAcess', () => {
  it('Validar cuando el usuario tiene accesos a los presupuestos y se manda a llamar la funcion de next()', async () => {

    const req = createRequest({
      budget: budgets[0],
      user: { id: 1 }
    })

    const res = createResponse()
    const next = jest.fn();

    hasAcess(req, res, next);
    expect(next).toHaveBeenCalled()/*validar que next no se mande a llamar*/
    expect(next).toHaveBeenCalledTimes(1); /*Validar que next se mande a llamar solamente 1 vez */
  })

  it('Validar cuando el usuario no tiene accesos o permisos y validar el error 401 y no se mande a llamar la funcion de next()',  () => {

    const req = createRequest({
      budget: budgets[2],
      user: { id: 1 }
    })

    const res = createResponse()
    const next = jest.fn();

    hasAcess(req, res, next);
    expect(next).not.toHaveBeenCalled()
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'No tienes permisos para realizar esta accion.' })
  })
})