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
        where:{
          userId: req.user.id
        }
      })
      res.status(201).json(budget);
    } catch (error) {
      res.status(500).json({ error: 'Existe error en traer todos los presupuestos.' });
      return
    }
  }

  static getById = async (req: Request, res: Response) => {
    const budget = await Budget.findByPk(req.budget.id, {
      include: [Expense],
    })
      res.status(200).json(budget);
      return
  }

  static create = async (req: Request, res: Response) => {
    try {
      const budget = await Budget.create(req.body)
      budget.userId = req.user.id
      await budget.save();
      res.status(201).json('Presupuesto Creado Correctamente.');
    } catch (error) {
      res.status(500).json({ error: 'Existe error al crear los presupuestos.' });
      return
    }
  }

  static updateById = async (req: Request, res: Response) => {
    const budGet = req.body
    await req.budget.update(budGet);
    res.status(200).json('Presupuesto actualizado correctamente.');
  }

  static deleteById = async (req: Request, res: Response) => {
    const budGet = req.body
    await req.budget.destroy(budGet);
    res.status(200).json('Presupuesto Eliminado.');
  }
}






