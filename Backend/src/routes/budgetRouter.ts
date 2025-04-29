import { Router } from 'express'
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'
import { BudgetController } from '../controllers/BudgetController';
import { handleInputErrors } from '../middleware/validation';
import { ExpensesController } from '../controllers/ExpenseController';
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from '../middleware/expense';

const router: Router = Router()
/*Presupuestos*/
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

/*Gastos*/
router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)

/*Router for presupuestos*/
router.get('/', BudgetController.getAll)
router.post('/', validateBudgetInput, handleInputErrors, BudgetController.create)
router.get('/:budgetId', BudgetController.getById) /*Se Trae un presupuesto por su id y asu vez todos los gatos*/
router.put('/:budgetId', validateBudgetInput, handleInputErrors, BudgetController.updateById)
router.delete('/:budgetId', BudgetController.deleteById)

/*Router for Gastos*/
router.post('/:budgetId/expenses', validateExpenseInput, handleInputErrors,ExpensesController.create) /*Se crea gasto y hay que pasarle a que presupuesto es asignado*/

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', validateExpenseInput, handleInputErrors ,ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router;