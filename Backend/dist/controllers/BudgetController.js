"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const Expense_1 = __importDefault(require("../models/Expense"));
class BudgetController {
    static getAll = async (req, res) => {
        try {
            const budget = await Budget_1.default.findAll({
                order: [
                    ['createdAt', 'ASC']
                ],
                where: {
                    userId: req.user.id
                }
            });
            res.status(201).json(budget);
        }
        catch (error) {
            res.status(500).json({ error: 'Existe error en traer todos los presupuestos.' });
            return;
        }
    };
    static getById = async (req, res) => {
        const budget = await Budget_1.default.findByPk(req.budget.id, {
            include: [Expense_1.default],
        });
        res.status(200).json(budget);
        return;
    };
    static create = async (req, res) => {
        try {
            const budget = await Budget_1.default.create(req.body);
            budget.userId = req.user.id;
            await budget.save();
            res.status(201).json('Presupuesto Creado Correctamente.');
        }
        catch (error) {
            res.status(500).json({ error: 'Existe error al crear los presupuestos.' });
            return;
        }
    };
    static updateById = async (req, res) => {
        const budGet = req.body;
        await req.budget.update(budGet);
        res.status(200).json('Presupuesto actualizado correctamente.');
    };
    static deleteById = async (req, res) => {
        const budGet = req.body;
        await req.budget.destroy(budGet);
        res.status(200).json('Presupuesto Eliminado.');
    };
}
exports.BudgetController = BudgetController;
//# sourceMappingURL=BudgetController.js.map