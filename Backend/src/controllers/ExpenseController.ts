import type { Request, Response } from 'express';
import Expense from '../models/Expense';
export class ExpensesController {
  static create = async (req: Request, res: Response) => {
    try {
      const expense = await Expense.create(req.body)
      expense.budgetId = req.budget.id
      await expense.save();
      res.status(201).json('Gasto Creado.');
    } catch (error) {
      const e = new Error('Existe error en la creacion de gastos.')
      res.status(500).json({ error: e.message });
      return
    }
  }
  /*traer gasto por Id*/
  static getById = async (req: Request, res: Response) => {
    /*Devuelve el gasto como JSON*/
    res.status(200).json(req.expense);
  }
  static updateById = async (req: Request, res: Response) => {
    await req.expense.update(req.body);
    res.status(200).json('Gasto actualizado correctamente.');
  }
  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy(req.body);
    res.status(200).json('Gasto Eliminado.');
  }
}