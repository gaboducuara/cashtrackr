import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'
import { limiter } from '../config/limiter'
import { authenticated } from '../middleware/auth'

const router: Router = Router()

router.use(limiter)

router.post('/create-account',
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'),
  body('email').isEmail().withMessage('El email no es valido.'),
  handleInputErrors,
  AuthController.createAccount)

router.post('/confirm-account',
  body('token')
    .isLength({ min: 6, max: 6 })
    .withMessage('token no es Valido.'),
  handleInputErrors,
  AuthController.ConfirmedAccount
)

router.post('/login',
  body('email').isEmail().withMessage('El email no es valido.'),
  body('password').notEmpty().withMessage('El password es obligatorio.'),
  handleInputErrors,
  AuthController.Login
)

router.post('/forgot-password',
  body('email').isEmail().withMessage('El email no es valido.'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post('/validate-token',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('El token no es Valido.'),
  handleInputErrors,
  AuthController.validateToken
)

router.post('/new-password/:token',
  param('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('El token no es Valido.'),
  body('password')
    .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'),
  handleInputErrors,
  AuthController.resetPasswordWithToken
)

router.get('/user',
  authenticated,
  AuthController.user
)

router.put('/user',
  authenticated,
  AuthController.updateUser
)

router.post('/update-password',
  authenticated,
  body('currentPassword').notEmpty().withMessage('El password Actual no puede ir vacio'),
  body('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'),
  handleInputErrors,
  AuthController.updateCurrencyUserPassword
)

router.post('/check-password',
  authenticated,
  body('password').notEmpty().withMessage('El password Actual no puede ir vacio'),
  handleInputErrors,
  AuthController.checkpassword
)
export default router