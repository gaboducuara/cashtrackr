import { Metadata } from "next";

import ProgressBar from '@/app/components/budget/ProgressBar';
import { getBudget } from '@/src/services/budget';
import AddExpenseButton from '@/app/components/expenses/AddExpenseButton';
import Amount from '@/app/components/ui/Amount';
import { formatCurrency, formatDate } from '@/src/utils';
import ExpenseMenu from '@/app/components/expenses/ExpenseMenu';
import ModalContainer from '@/app/components/ui/ModalContainer';

type PageProps = {
    params: Promise <{ id: string }>
}

export async function generateMetadata({ params }: PageProps ): Promise<Metadata> {

    const {id} = await params;
    const budget = await getBudget(id)

    return {
        title: `CashTrackr - ${budget.name}`,
        description: `CashTrackr - ${budget.name}`,
    }
}
export default async function BudgetDetailsPage({params}: Readonly <{ params:Promise<{ id: string }>}> ) {

    const { id } = await params;
    const budget = await getBudget(id)
    const totalSpent = budget.expenses.reduce((total, expense) => +expense.amount + total, 0)
    const totalAvailable = +budget.amount - totalSpent
    const percentage = +((totalSpent / +budget.amount) * 100).toFixed(2)

    return (
        <>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
                    <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
                </div>
                <AddExpenseButton />
            </div>

            {budget.expenses.length ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                        <ProgressBar
                            percentage={percentage}
                        />
                        <div className="flex flex-col justify-center items-center md:items-start gap-5">
                            <Amount
                                label="Presupuesto"
                                amount={+budget.amount}
                            />
                            <Amount
                                label="Disponible"
                                amount={totalAvailable}
                            />
                            <Amount
                                label="Gastado"
                                amount={totalSpent}
                            />
                        </div>
                    </div>

                    <h1 className="font-black text-4xl text-purple-950 mt-10">
                        Gastos en este presupuesto
                    </h1>

                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {budget.expenses.map((expense) => (
                            <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {expense.name}
                                        </p>
                                        <p className="text-xl font-bold text-amber-500">
                                            {formatCurrency(+expense.amount)}
                                        </p>
                                        <p className='text-gray-500  text-sm'>
                                            Agregado: {''}
                                            <span className="font-bold">{formatDate(expense.updatedAt)}</span>
                                        </p>
                                    </div>
                                </div>

                                <ExpenseMenu
                                    expenseId={expense.id}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="text-center py-20">No hay gastos aún</p>
            )}
            <ModalContainer />
        </>
    )
}
