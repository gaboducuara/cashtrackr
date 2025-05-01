import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'

const router:Router = Router()

router.post('/create-account',
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'),
  body('email').isEmail().withMessage('El email no es valido.'),
  handleInputErrors,
  AuthController.createAccount)

export default router























// router.param('budgetId', validateBudgetId)
// router.param('budgetId', validateBudgetExists)

// router.param('expenseId', validateExpenseId)
// router.param('expenseId', validateExpenseExists)