import type {Request, Response, NextFunction } from 'express'
import {param, validationResult, body } from 'express-validator'
import Expense from '../models/Expense'

declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
  await body('name')
    .notEmpty().withMessage('El nombre del Gasto es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre del Gasto debe tener mas de 3 caracteres').run(req)
  await body('amount')
    .notEmpty().withMessage('El monto del Gasto es obligatorio')
    .isNumeric().withMessage('El monto del Gasto debe ser un número')
    .custom(value => value > 0).withMessage('El monto del Gasto debe ser mayor a 0').run(req)

  next()
}
/*Validacion de gastos con ID */
export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
  await param('expenseId')
    .isInt().withMessage('ID no valido, debe ser un numero entero')
    .custom(value => value > 0).withMessage('ID no valido, El numero entero debe ser mayor a 0')
    .run(req)

    const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}
/*Validacion de que el gasto exista*/
export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { expenseId } = req.params
    const expense = await Expense.findByPk(expenseId)
    if (!expense) {
      const error = new Error('El Id con ese gasto no ha sido encontrado.')
      res.status(404).json({ error: error.message });
      return
    }
    req.expense = expense
    next()
  } catch (error) {
    const e = new Error('existe error en los Gastos.')
    res.status(500).json({ error: e.message });
    return
  }
}

export const belongsToBudget = async (req: Request, res: Response, next: NextFunction) => {
    if(req.budget.id !== req.expense.budgetId) {
        const error = new Error('Acción no válida')
        return res.status(403).json({error: error.message})
    }
    next()
}