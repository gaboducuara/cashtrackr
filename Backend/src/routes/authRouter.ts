import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
import { limiter } from '../config/limiter'

const router: Router = Router()
/*limitar la cantidad de peticiones login que puede hacer una persona*/
router.use(limiter)
router.post('/create-account',
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'),
  body('email').isEmail().withMessage('El email no es valido.'),
  handleInputErrors,
  AuthController.createAccount)

/*Confirmacion de cuenta*/
/*Se envia un token al email del usuario para confirmar la cuenta*/
router.post('/confirm-account',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('El token no es Valido.'),
  handleInputErrors,
  AuthController.ConfirmedAccount
)
/*Login*/
router.post('/login',
  // limiter,
  body('email').isEmail().withMessage('El email no es valido.'),
  body('password').notEmpty().withMessage('El password es obligatorio.'),
  handleInputErrors,
  AuthController.Login
)
/*Recuperar Password*/
export default router























// router.param('budgetId', validateBudgetId)
// router.param('budgetId', validateBudgetExists)

// router.param('expenseId', validateExpenseId)
// router.param('expenseId', validateExpenseExists)