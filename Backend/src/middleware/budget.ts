import type { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator'
import Budget from '../models/Budget';
declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
  await param('budgetId')
    .isInt().withMessage('ID no valido, debe ser un numero entero').bail()
    .custom(value => value > 0).withMessage('ID no valido, El numero entero debe ser mayor a 0').bail()
    .run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  next()
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { budgetId } = req.params
    const budget = await Budget.findByPk(budgetId)
    if (!budget) {
      const error = new Error('Presupuesto no ha sido encontrado.')
      res.status(404).json({ error: error.message });
      return
    }
    req.budget = budget
    next()
  } catch (error) {
    res.status(500).json({error: 'existe error en el presupuesto.'})
    return
  }
}
export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
  await body('name')
    .notEmpty().withMessage('El nombre del presupuesto es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre del presupuesto debe tener mas de 3 caracteres').run(req)
  await body('amount')
    .notEmpty().withMessage('El monto del presupuesto es obligatorio')
    .isNumeric().withMessage('El monto del presupuesto debe ser un número')
    .custom(value => value > 0).withMessage('El monto del presupuesto debe ser mayor a 0').run(req)

  next()
}

export const  hasAcess = (req: Request, res: Response, next: NextFunction) => {
  if( req.budget.userId !== req.user.id ){
    const error = new Error('No tienes permisos para realizar esta accion.')
    res.status(401).json({error:error.message})
    return
  }
  next();
}