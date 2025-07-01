import { DialogTitle } from "@headlessui/react";
import { useEffect, useState, useActionState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import ExpenseForm from "./ExpenseForm";
import ErrorMessage from "../ui/ErrorMessage";

import type { DraftExpense } from '@/src/schemas';
import editExpense from '@/actions/edit-expense-action';

type EditExpenseFormProps = {
  closeModal: () => void
}

export default function EditExpenseForm({ closeModal }: Readonly<EditExpenseFormProps>) {
  const [expense, setExpense] = useState<DraftExpense>()
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('editExpenseId')!

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: budgetId ? +budgetId : NaN,
    expenseId: +expenseId
  })
  const [state, dispatch] = useActionState(editExpenseWithBudgetId, {
    errors: [],
    success: ''
  })
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budget/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then(res => res.json())
      .then(data => setExpense(data))
  }, [budgetId, expenseId])

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state, closeModal])

  if (!budgetId || isNaN(+budgetId)) {
    return <ErrorMessage>Error: No se encontró el presupuesto o gasto a eliminar.</ErrorMessage>;
  }

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">Gasto...</span>
      </p>

      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <ExpenseForm
          expense={expense}
        />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}