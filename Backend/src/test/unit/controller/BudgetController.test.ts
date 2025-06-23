import { createRequest, createResponse } from 'node-mocks-http'
import { BudgetController } from '../../../controllers/BudgetController'
import { budgets } from '../../mocks/budgets'
import Budget from '../../../models/Budget'
import Expense from '../../../models/Expense'

jest.mock('../../../models/Budget', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}))
describe('BudgetController.getAll', () => {
  beforeEach(() => {
    (Budget.findAll as jest.Mock).mockReset();
    (Budget.findAll as jest.Mock).mockImplementation((options) => {
      const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);
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

    const updatedBudgets = budgets.filter(budget => budget.userId === req.user.id);
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
      url: '/api/budget',
      user: { id: 10 }
    });

    const res = createResponse();

    const updatedBudgets = budgets.filter(budget => budget.userId === req.user.id);
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
    expect(res._getJSONData()).toEqual({ error: 'Existe error en traer todos los presupuestos.' })
  })
})
describe('BudgetController.create', () => {
  it('Debería Crear un nuevo Presupuesto y responder con statusCode 201', async () => {

    const mockBudget = {
      save: jest.fn().mockResolvedValue(true)
    };
    (Budget.create as jest.Mock).mockResolvedValue(mockBudget);

    const req = createRequest({
      method: 'POST',
      url: '/api/budget',
      user: { id: 1 },
      body: { name: 'Presupuesto Prueba', amount: 1000 }
    });

    const res = createResponse();
    await BudgetController.create(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toBe('Presupuesto Creado Correctamente.')
    expect(mockBudget.save).toHaveBeenCalled();
    expect(mockBudget.save).toHaveBeenCalledTimes(1);
    expect(Budget.create).toHaveBeenCalledWith(req.body);
  })
  it('Controlar handle budget creation error', async () => {

    const mockBudget = {
      save: jest.fn()
    };

    (Budget.create as jest.Mock).mockRejectedValue(new Error);
    const req = createRequest({
      method: 'POST',
      url: '/api/budget',
      user: { id: 1 },
      body: { name: 'Presupuesto Prueba', amount: 1000 }
    });

    const res = createResponse();

    (Budget.create as jest.Mock).mockRejectedValue(new Error)
    await BudgetController.create(req, res);
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Existe error al crear los presupuestos.' })
    expect(mockBudget.save).not.toHaveBeenCalled();
    expect(Budget.create).toHaveBeenCalledWith(req.body);
  })
})
describe('BudgetController.getById', () => {
  beforeEach(() => {
    (Budget.findByPk as jest.Mock).mockImplementation((id) => {
      const budget = budgets.filter(budget => budget.id === id)[0];
      return Promise.resolve(budget)
    })
  })
  it('debe recuperar un Presupuesto para el id 1 y 3 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:budgetId',
      budget: { id: 1 },
    });
    const res = createResponse();
    await BudgetController.getById(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data.expenses).toHaveLength(3);
    expect(Budget.findByPk).toHaveBeenCalled();
    expect(Budget.findByPk).toHaveBeenCalledTimes(1);
    expect(Budget.findByPk).toHaveBeenCalledWith(req.budget.id, {
      include: [Expense],
    });
  })
  it('debe recuperar un Presupuesto para el id 2 y 2 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:id',
      budget: { id: 2 },
    });
    const res = createResponse();
    await BudgetController.getById(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data.expenses).toHaveLength(2);
  })
  it('debe recuperar un Presupuesto para el id 2 y 2 gastos', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:id',
      budget: { id: 3 },
    });
    const res = createResponse();
    await BudgetController.getById(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data.expenses).toHaveLength(0);
  })
})
describe('BudgetController.updateById', () => {
  it('Recuperar la actualizacion del Presupuesto y Retornar el mensaje', async () => {
    const BudgetMock = {
      update: jest.fn().mockResolvedValue(true)
    }
    const req = createRequest({
      method: 'PUT',
      url: '/api/budget/:budgetId',
      budget: BudgetMock,
      body: { name: 'Presupuesto Actualizado', amount: 1000 },
    });
    const res = createResponse();
    await BudgetController.updateById(req, res);
    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toBe('Presupuesto actualizado correctamente.')
    expect(BudgetMock.update).toHaveBeenCalled()
    expect(BudgetMock.update).toHaveBeenCalledTimes(1)
    expect(BudgetMock.update).toHaveBeenCalledWith(req.body)
  })
})
describe('BudgetController.deleteById', () => {
  it('Eliminar el Presupuesto y Retornar el mensaje', async () => {
    const BudgetMock = {
      destroy: jest.fn().mockResolvedValue(true)
    }
    const req = createRequest({
      method: 'DELETE',
      url: '/api/budget/:budgetId',
      budget: BudgetMock,
    });
    const res = createResponse();
    await BudgetController.deleteById(req, res);
    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toBe('Presupuesto Eliminado.')
    expect(BudgetMock.destroy).toHaveBeenCalled()
    expect(BudgetMock.destroy).toHaveBeenCalledTimes(1)
  })
})