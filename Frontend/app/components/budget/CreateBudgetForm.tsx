"use client"

import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation"

import ErrorMessage from '../ui/ErrorMessage';
import { CreateBudget } from '../../../actions/create-budget-action';
import BudgetForm from './BudgetForm';

export default function CreateBudgetForm() {
  const router = useRouter()

  const [state, dispatch] = useActionState(CreateBudget, {
    //en caso de errores en zod
    errors: [],
    //en caso de que se genere correctamente un presupuesto
    success: ''
  })

  //De esta forma ya al tener creado un presupuesto se envia a la vista de presupuesto.
  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      router.push('/admin')
    }
  }, [state, router])

  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      {/* Estructura de crear presupuesto */}
      <BudgetForm/>

      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}