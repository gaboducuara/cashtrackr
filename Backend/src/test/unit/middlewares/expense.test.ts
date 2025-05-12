import { createRequest, createResponse } from 'node-mocks-http'
import {validateExpenseExists } from '../../../middleware/expense'
import { expenses } from '../../mocks/expense';
import Expense from '../../../models/Expense'
import { hasAcess } from '../../../middleware/budget';
import { budgets } from '../../mocks/budgets';

//prueba hacia presupuestos
jest.mock('../../../models/Expense', () => ({
  /*Simulacion de metodos en Sequelize*/
  findByPk: jest.fn()
}))

describe('Expenses - Middlewares - validateExpensesExist', () => {
  beforeEach(() => {
    (Expense.findByPk as jest.Mock).mockImplementation((id) => {
      const expense = expenses.filter(e => e.id === id)[0] ?? null
      return Promise.resolve(expense)
    });
  })

  it('deberia gestionar un Gasto inexistente', async () => {
    (Expense.findByPk as jest.Mock).mockResolvedValue(null)

    const req = createRequest({
      params: { expenseId: '120' }
    })

    const res = createResponse()
    const next = jest.fn();

    await validateExpenseExists(req, res, next)
    expect(res.statusCode).toBe(404) /*validar el llamado del 404 como error*/
    expect(res._getJSONData()).toEqual({ error: 'El Id con ese gasto no ha sido encontrado.' }) /*Validar que el mensaje de error sea el correcto*/
    expect(next).not.toHaveBeenCalled()/*Validar que el metodo next() no se haya mandando a llamar*/
  })

  it('debe pasar al siguiente middleware. si pasa correctamente la validacion del presupuesto', async () => {  /*Revisa que un gasto exista*/
    (Expense.findByPk as jest.Mock).mockResolvedValue(expenses[0])

    const req = createRequest({
      params: { expenseId : '1' }
    })

    const res = createResponse()
    const next = jest.fn();

    await validateExpenseExists(req, res, next)
    expect(next).toHaveBeenCalled() /*Validar que el llamado del next() sea correcto*/
    expect(next).toHaveBeenCalledTimes(1)
    expect(req.expense).toEqual(expenses[0])
  })

  it('Validar cuando el Gasto cae en un error catch 500', async () => {
      (Expense.findByPk as jest.Mock).mockRejectedValue(new Error) /*Forzando el error para que se vaya a la parte del catch 500 estamos hablando del middleare validatExpenseExists*/

      const req = createRequest({
        params: { expenseId: '1' }
      })

      const res = createResponse()
      const next = jest.fn();

      await validateExpenseExists(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(res.statusCode).toBe(500) /*validar el llamado del 404 como error*/
      expect(res._getJSONData()).toEqual({ error: 'existe error en los Gastos.' })
    })
})

describe('Expense Middlewares - hasAcess', () => {
  it('Validar que el usuario No puede agregar gastos a un presupuesto que no tiene acceso ', async () => {

    const req = createRequest({
      method:'POST',
      url:'/api/budgets/:budgetId/expenses',
      budget: budgets[0],
      user: {id : 20},
      body: {name: 'Expense Test', amount: 4500 }
    })

    const res = createResponse()
    const next = jest.fn();

    hasAcess(req, res, next);

    const data = res._getJSONData()
    expect(res.statusCode).toBe(401)
    expect(data).toEqual({error: 'No tienes permisos para realizar esta accion.'})
    expect(next).not.toHaveBeenCalled()
  })
})