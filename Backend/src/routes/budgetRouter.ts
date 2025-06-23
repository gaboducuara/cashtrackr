import { Router } from 'express'
import { hasAcess, validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'
import { BudgetController } from '../controllers/BudgetController';
import { handleInputErrors } from '../middleware/validation';
import { ExpensesController } from '../controllers/ExpenseController';
import { belongsToBudget ,validateExpenseExists, validateExpenseId, validateExpenseInput } from '../middleware/expense';
import { authenticated } from '../middleware/auth';

const router: Router = Router()

router.use(authenticated)

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)
router.param('budgetId', hasAcess)
router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)
router.param('expenseId', belongsToBudget)

router.get('/', BudgetController.getAll)
router.post('/', validateBudgetInput, handleInputErrors, BudgetController.create)
router.get('/:budgetId', BudgetController.getById)
router.put('/:budgetId', validateBudgetInput, handleInputErrors, BudgetController.updateById)
router.delete('/:budgetId', BudgetController.deleteById)

router.post('/:budgetId/expenses', validateExpenseInput, handleInputErrors,ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', validateExpenseInput, handleInputErrors ,ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router;