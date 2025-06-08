"use client"

import { CreateBudget } from '../../../actions/create-budget-action';
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';
import ErrorMessage from '../ui/ErrorMessage';
import { useRouter } from "next/navigation"

export default function CreateBudgetForm() {

  const router = useRouter()

  const [state, dispatch] = useActionState(CreateBudget, {
    //en caso de errores en zod
    errors: [],
    //en caso de que se genere correctamente un presupuesto
    success: ''
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/admin')
        },
        onClick: () => {
          router.push('/admin')
        }
      })
    }
  }, [state, router])

  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="Nombre del Presupuesto"
          name="name"
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Precio
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="Precio del Presupuesto"
          name="amount"
        />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}