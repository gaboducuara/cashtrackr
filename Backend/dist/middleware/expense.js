"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.belongsToBudget = exports.validateExpenseExists = exports.validateExpenseId = exports.validateExpenseInput = void 0;
const express_validator_1 = require("express-validator");
const Expense_1 = __importDefault(require("../models/Expense"));
const validateExpenseInput = async (req, res, next) => {
    await (0, express_validator_1.body)('name')
        .notEmpty().withMessage('El nombre del Gasto es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre del Gasto debe tener mas de 3 caracteres').run(req);
    await (0, express_validator_1.body)('amount')
        .notEmpty().withMessage('El monto del Gasto es obligatorio')
        .isNumeric().withMessage('El monto del Gasto debe ser un número')
        .custom(value => value > 0).withMessage('El monto del Gasto debe ser mayor a 0').run(req);
    next();
};
exports.validateExpenseInput = validateExpenseInput;
const validateExpenseId = async (req, res, next) => {
    await (0, express_validator_1.param)('expenseId')
        .isInt().withMessage('ID no valido, debe ser un numero entero')
        .custom(value => value > 0).withMessage('ID no valido, El numero entero debe ser mayor a 0')
        .run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateExpenseId = validateExpenseId;
const validateExpenseExists = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense_1.default.findByPk(expenseId);
        if (!expense) {
            const error = new Error('El Id con ese gasto no ha sido encontrado.');
            res.status(404).json({ error: error.message });
            return;
        }
        req.expense = expense;
        next();
    }
    catch (error) {
        const e = new Error('existe error en los Gastos.');
        res.status(500).json({ error: e.message });
        return;
    }
};
exports.validateExpenseExists = validateExpenseExists;
const belongsToBudget = async (req, res, next) => {
    if (req.budget.id !== req.expense.budgetId) {
        const error = new Error('Acción no válida');
        return res.status(403).json({ error: error.message });
    }
    next();
};
exports.belongsToBudget = belongsToBudget;
//# sourceMappingURL=expense.js.map