import { createRequest, createResponse } from 'node-mocks-http'
import { BudgetController } from '../../controllers/BudgetController'
import { budgets } from '../mocks/budgets'
import Budget from '../../models/Budget'

//prueba hacia presupuestos
jest.mock('../../models/Budget', () => ({
  findAll: jest.fn(),
}))
//Pruebas unitarias
describe('BudgetController.getAll', () => {

  // se Ejecuta antes de que cada TEST arranque
  beforeEach(() => {
    (Budget.findAll as jest.Mock).mockReset();
    (Budget.findAll as jest.Mock).mockImplementation((options) => {
      console.log(options.where.userId)
      const updatedBudgets = budgets.filter( budget => budget.userId === options.where.userId);
      return Promise.resolve(updatedBudgets)
    })
  })

  it('debe recuperar 2 Presupuestos para el usuario con el id 1', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 1 }
    });

    const res = createResponse();
    // lo que se hace es filtrar la busqueda por Id del mock budgets, hacer la busqueda compararlo el id del mock con el parametro que se le pasa


    await BudgetController.getAll(req, res);
    const data = res._getJSONData()
    expect(data).toHaveLength(2)
    expect(res.statusCode).toBe(201)
    expect(res.status).not.toBe(404)
  })

  it('debe recuperar 1 Presupuesto para el usuario con el id 2', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 2 }
    });

    const res = createResponse();
    // lo que se hace es filtrar la busqueda por Id del mock budgets, hacer la busqueda compararlo el id del mock con el parametro que se le pasa
    const updatedBudgets = budgets.filter( budget => budget.userId === req.user.id);
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);
    await BudgetController.getAll(req, res);
    const data = res._getJSONData()
    expect(data).toHaveLength(1);
    expect(res.statusCode).toBe(201)
    expect(res.status).not.toBe(404)
  })

  it('debe recuperar 0 Presupuesto para el usuario con el id 10', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 10 }
    });

    const res = createResponse();
    // lo que se hace es filtrar la busqueda por Id del mock budgets, hacer la busqueda compararlo el id del mock con el parametro que se le pasa
    const updatedBudgets = budgets.filter( budget => budget.userId === req.user.id);
    (Budget.findAll as jest.Mock).mockResolvedValue(updatedBudgets);
    await BudgetController.getAll(req, res);
    const data = res._getJSONData()
    expect(data).toHaveLength(0);
    expect(res.statusCode).toBe(201)
    expect(res.status).not.toBe(404)
  })

  it('Gestionar error al obtener presupuestos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget',
      user: { id: 10 }
    });

    const res = createResponse();

    (Budget.findAll as jest.Mock).mockRejectedValue(new Error)
    await BudgetController.getAll(req, res);

    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({error: 'Existe error en traer todos los presupuestos.'}) /*ayuda a similar el mensaje de error del controlador es decir se debe poner el mismo mensaje de error del controlador aqui*/
  })
})