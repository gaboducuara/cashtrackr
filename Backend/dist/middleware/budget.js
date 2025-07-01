"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAcess = exports.validateBudgetInput = exports.validateBudgetExists = exports.validateBudgetId = void 0;
const express_validator_1 = require("express-validator");
const Budget_1 = __importDefault(require("../models/Budget"));
const validateBudgetId = async (req, res, next) => {
    await (0, express_validator_1.param)('budgetId')
        .isInt().withMessage('ID no valido, debe ser un numero entero').bail()
        .custom(value => value > 0).withMessage('ID no valido, El numero entero debe ser mayor a 0').bail()
        .run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateBudgetId = validateBudgetId;
const validateBudgetExists = async (req, res, next) => {
    try {
        const { budgetId } = req.params;
        const budget = await Budget_1.default.findByPk(budgetId);
        if (!budget) {
            const error = new Error('Presupuesto no ha sido encontrado.');
            res.status(404).json({ error: error.message });
            return;
        }
        req.budget = budget;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'existe error en el presupuesto.' });
        return;
    }
};
exports.validateBudgetExists = validateBudgetExists;
const validateBudgetInput = async (req, res, next) => {
    await (0, express_validator_1.body)('name')
        .notEmpty().withMessage('El nombre del presupuesto es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre del presupuesto debe tener mas de 3 caracteres').run(req);
    await (0, express_validator_1.body)('amount')
        .notEmpty().withMessage('El monto del presupuesto es obligatorio')
        .isNumeric().withMessage('El monto del presupuesto debe ser un número')
        .custom(value => value > 0).withMessage('El monto del presupuesto debe ser mayor a 0').run(req);
    next();
};
exports.validateBudgetInput = validateBudgetInput;
const hasAcess = (req, res, next) => {
    if (req.budget.userId !== req.user.id) {
        const error = new Error('No tienes permisos para realizar esta accion.');
        res.status(401).json({ error: error.message });
        return;
    }
    next();
};
exports.hasAcess = hasAcess;
//# sourceMappingURL=budget.js.map