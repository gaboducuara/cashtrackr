"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const validation_1 = require("../middleware/validation");
const limiter_1 = require("../config/limiter");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(limiter_1.limiter);
router.post('/create-account', (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre es obligatorio.'), (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'), (0, express_validator_1.body)('email').isEmail().withMessage('El email no es valido.'), validation_1.handleInputErrors, AuthController_1.AuthController.createAccount);
router.post('/confirm-account', (0, express_validator_1.body)('token')
    .isLength({ min: 6, max: 6 })
    .withMessage('token no es Valido.'), validation_1.handleInputErrors, AuthController_1.AuthController.ConfirmedAccount);
router.post('/login', (0, express_validator_1.body)('email').isEmail().withMessage('El email no es valido.'), (0, express_validator_1.body)('password').notEmpty().withMessage('El password es obligatorio.'), validation_1.handleInputErrors, AuthController_1.AuthController.Login);
router.post('/forgot-password', (0, express_validator_1.body)('email').isEmail().withMessage('El email no es valido.'), validation_1.handleInputErrors, AuthController_1.AuthController.forgotPassword);
router.post('/validate-token', (0, express_validator_1.body)('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('El token no es Valido.'), validation_1.handleInputErrors, AuthController_1.AuthController.validateToken);
router.post('/new-password/:token', (0, express_validator_1.param)('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('El token no es Valido.'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'), validation_1.handleInputErrors, AuthController_1.AuthController.resetPasswordWithToken);
router.get('/user', auth_1.authenticated, AuthController_1.AuthController.user);
router.put('/user', auth_1.authenticated, AuthController_1.AuthController.updateUser);
router.post('/update-password', auth_1.authenticated, (0, express_validator_1.body)('currentPassword').notEmpty().withMessage('El password Actual no puede ir vacio'), (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('El password debe tener al menos 8 caracteres.'), validation_1.handleInputErrors, AuthController_1.AuthController.updateCurrencyUserPassword);
router.post('/check-password', auth_1.authenticated, (0, express_validator_1.body)('password').notEmpty().withMessage('El password Actual no puede ir vacio'), validation_1.handleInputErrors, AuthController_1.AuthController.checkpassword);
exports.default = router;
//# sourceMappingURL=authRouter.js.map