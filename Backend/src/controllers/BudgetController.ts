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
        where:{
          userId: req.user.id
        }
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
    })
      res.status(200).json(budget);
  }
  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body)
      //Asignacion de presupuesto al usuario logueado correctamente
      budget.userId = req.user.id
      await budget.save();
      res.status(201).json('Presupuesto Creado Correctamente.');
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






