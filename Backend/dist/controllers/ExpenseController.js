"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
const Expense_1 = __importDefault(require("../models/Expense"));
class ExpensesController {
    static create = async (req, res) => {
        try {
            const expense = await Expense_1.default.create(req.body);
            expense.budgetId = req.budget.id;
            await expense.save();
            res.status(201).json('Gasto Creado.');
        }
        catch (error) {
            const e = new Error('Existe error en la creacion de gastos.');
            res.status(500).json({ error: e.message });
            return;
        }
    };
    static getById = async (req, res) => {
        res.status(200).json(req.expense);
    };
    static updateById = async (req, res) => {
        await req.expense.update(req.body);
        res.status(200).json('Gasto actualizado correctamente.');
    };
    static deleteById = async (req, res) => {
        await req.expense.destroy(req.body);
        res.status(200).json('Gasto Eliminado.');
    };
}
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=ExpenseController.js.map