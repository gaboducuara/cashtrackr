import { Router } from 'express'
import { hasAcess, validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'
import { BudgetController } from '../controllers/BudgetController';
import { handleInputErrors } from '../middleware/validation';
import { ExpensesController } from '../controllers/ExpenseController';
import { belongsToBudget ,validateExpenseExists, validateExpenseId, validateExpenseInput } from '../middleware/expense';
import { authenticated } from '../middleware/auth';

const router: Router = Router()

/*para que un usuario crear y realizar presupuestos debe estar autenticado*/
router.use(authenticated)

/*Presupuestos*/
router.param('budgetId', validateBudgetId) /*predice que el id sea valido - ID no valido, debe ser un numero entero*/
router.param('budgetId', validateBudgetExists) /*Predice que el presupuesto sea encontrado - Presupuesto no ha sido encontrado. */
router.param('budgetId', hasAcess) /*Predice que el usuario tenga permisos para buscar un presupuestos - No tienes permisos para realizar esta accion. */

/*Gastos*/
router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)
router.param('expenseId', belongsToBudget)

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