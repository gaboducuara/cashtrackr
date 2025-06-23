import { createRequest, createResponse } from 'node-mocks-http'
import { ExpensesController } from '../../../controllers/ExpenseController'
import Expense from '../../../models/Expense'
import { expenses } from '../../mocks/expense'

jest.mock('../../../models/Expense', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}))
describe('ExpensesController.create', () => {
  it('Debería Crear un nuevo Gasto y responder con statusCode 201', async () => {
    const expenseMock = {
      save: jest.fn().mockResolvedValue(true)
    };
    (Expense.create as jest.Mock).mockResolvedValue(expenseMock);

    const req = createRequest({
      method: 'POST',
      url: 'api/budgets/:budgetId/expenses',
      body: { name: 'Gasto Prueba', amount: 1000 },
      budget: { id: 1 }
    });

    const res = createResponse();

    await ExpensesController.create(req, res)
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toBe('Gasto Creado.')
    expect(expenseMock.save).toHaveBeenCalled();
    expect(expenseMock.save).toHaveBeenCalledTimes(1);
    expect(Expense.create).toHaveBeenCalledWith(req.body);
  })
  it('Deberia llegar al catch error y responder con statusCode 500, validar mensaje de error', async () => {

    const mockExpense = {
      save: jest.fn()
    };

    (Expense.create as jest.Mock).mockRejectedValue(new Error);
    const req = createRequest({
      method: 'POST',
      url: '/:budgetId/expenses/:expenseId',
      user: { id: 1 },
      body: { name: 'Presupuesto Prueba', amount: 1000 }
    });

    const res = createResponse();

    (Expense.create as jest.Mock).mockRejectedValue(new Error)
    await ExpensesController.create(req, res);
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Existe error en la creacion de gastos.' })
    expect(mockExpense.save).not.toHaveBeenCalled();
    expect(Expense.create).toHaveBeenCalledWith(req.body);
  })
})
describe('ExpensesController.getById', () => {
  it('Deberia traer los gastos con ID 1', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budget/:budgetId/expenses/:expenseId',
      expense: expenses[0]
    });

    const res = createResponse();

    await ExpensesController.getById(req, res)

    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toEqual(expenses[0]);
  })
})
describe('ExpensesController.updateById', () => {
  it('Deberia Actualizar gastos', async () => {

    const expenseMock = {
      ...expenses[0],
      update: jest.fn().mockResolvedValue(true)
    }

    const req = createRequest({
      method: 'PUT',
      url: '/api/budget/:budgetId/expenses/:expenseId',
      expense: expenseMock,
      body: {
        name: 'Gasto Prueba',
        amount: 1000
      }
    });

    const res = createResponse();

    await ExpensesController.updateById(req, res)

    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toEqual('Gasto actualizado correctamente.')
    expect(expenseMock.update).toHaveBeenCalled()
    expect(expenseMock.update).toHaveBeenCalledWith(req.body)
    expect(expenseMock.update).toHaveBeenCalledTimes(1)
  })
})
describe('ExpensesController.deleteById', () => {
  it('Deberia Eliminar gastos', async () => {

    const expenseMock = {
      ...expenses[0],
      destroy: jest.fn().mockResolvedValue(true)
    }

    const req = createRequest({
      method: 'DELETE',
      url: '/api/budget/:budgetId/expenses/:expenseId',
      expense: expenseMock,
    });

    const res = createResponse();

    await ExpensesController.deleteById(req, res)

    const data = res._getJSONData()
    expect(res.statusCode).toBe(200);
    expect(data).toEqual('Gasto Eliminado.')
    expect(expenseMock.destroy).toHaveBeenCalled()
    expect(expenseMock.destroy).toHaveBeenCalledWith(req.body)
    expect(expenseMock.destroy).toHaveBeenCalledTimes(1)
  })
})