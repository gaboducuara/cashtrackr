import type { Request, Response } from 'express';
import Expense from '../models/Expense';
export class ExpensesController {
  static create = async (req: Request, res: Response) => {
    try {
      const expense = new Expense(req.body)
      expense.budgetId = req.budget.id
      const newExpense = await expense.save();
      res.status(201).json({ status: 'success', message: 'Gasto Creado.', data: newExpense });
    } catch (error) {
      const e = new Error('Existe error en la cracion de gasto.')
      res.status(500).json({ error: e.message });
      return
    }
  }
  /*traer gasto por Id*/
  static getById = async (req: Request, res: Response) => {
        const {expenseId} = req.params
        const expense = await Expense.findByPk(expenseId)
        res.status(200).json(expense);
  }
  static updateById = async (req: Request, res: Response) => {
    const Expense = req.body
    await req.expense.update(Expense);
    res.status(200).json({ status: 'success', message: 'Gasto actualizado correctamente.', data: Expense });
  }
  static deleteById = async (req: Request, res: Response) => {
    const Expense = req.body
    await req.expense.destroy(Expense);
    res.status(200).json({ status: 'success', message: 'Gasto Eliminado.', data: Expense });
    }
}