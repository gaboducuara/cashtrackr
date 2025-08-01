import { useRouter, usePathname, useSearchParams } from "next/navigation"
import {useCallback , useEffect, useActionState } from "react"
import { DialogTitle } from "@headlessui/react"
import { toast } from "react-toastify"

import { deleteBudget } from '@/actions/delete-budget-action'
import ErrorMessage from '../ui/ErrorMessage'

export default function ConfirmPasswordForm() {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const budgetId = +searchParams.get('deleteBudgetId')!

  const closeModal = useCallback(() => {
    const hideModal = new URLSearchParams(searchParams.toString())
    hideModal.delete('deleteBudgetId')
    router.replace(`${pathname}?${hideModal}`)
  }, [searchParams, router, pathname])

  const deleteBudgetWithPassword = deleteBudget.bind(null, budgetId)
  const [state, dispatch] = useActionState(deleteBudgetWithPassword, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state, closeModal])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">Ingresa tu Password para {''}
        <span className="text-amber-500">eliminar el presupuesto {''}</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un presupuesto eliminado y sus gastos no se pueden recuperar)</p>

      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <form
        className=" mt-5 space-y-5"
        noValidate
        action={dispatch}
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >Ingresa tu contraseña para eliminar</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name='password'
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value='Eliminar Presupuesto'
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >Cancelar</button>
        </div>
      </form>

    </>
  )
}