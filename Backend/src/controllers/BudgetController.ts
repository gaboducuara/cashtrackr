import type { Request, Response } from 'express';
import Budget from '../models/Budget';
import Expense from '../models/Expense';

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budget = await Budget.findAll({
        order: [
          ['createdAt', 'ASC']
        ],
        //TODO:Filtrar por el usuario autenticado
      })
      res.status(201).json({ status: 'success', message: 'Trae todos los presupuestos correctamente', data: budget });
    } catch (error) {
      const e = new Error('Existe error en traer todos los presupuestos.')
      res.status(500).json({ error: e.message });
      return
    }
  }
  static getById = async (req: Request, res: Response) => {
    //traer todos los gastos por presupuesto con el metodo include
    const budget = await Budget.findByPk(req.budget.id, {
      include: [Expense],
      order: [
        ['createdAt', 'ASC']
      ]
    })
    res.status(200).json(budget);
  }
  static create = async (req: Request, res: Response) => {
    const budget = new Budget(req.body)
    try {
      const newbudget = await budget.save();
      res.status(201).json({ status: 'success', message: 'Presupuesto Creado.', data: newbudget });
    } catch (error) {
      const e = new Error('Existe error en la cracion de presupuesto.')
      res.status(500).json({ error: e.message });
      return
    }
  }
  static updateById = async (req: Request, res: Response) => {
    const budGet = req.body
    await req.budget.update(budGet);
    res.status(200).json({ status: 'success', message: 'Presupuesto actualizado correctamente.', data: budGet });
  }
  static deleteById = async (req: Request, res: Response) => {
    const budGet = req.body
    await req.budget.destroy(budGet);
    res.status(200).json({ status: 'success', message: 'Presupuesto Eliminado.', data: budGet });
  }
}






