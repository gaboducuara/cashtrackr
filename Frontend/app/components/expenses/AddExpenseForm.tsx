import { DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";

import ExpenseForm from "./ExpenseForm";
import ErrorMessage from "../ui/ErrorMessage";
import createExpense from '@/actions/create-expense-action';

export default function AddExpenseForm({closeModal}: {closeModal: () => void}) {

    const {id} = useParams();

    if (typeof id === "undefined") {
        throw new Error("Budget ID is undefined.");
    }

    const createExpenseWithBudgetId = createExpense.bind(null, +id)
    const [state, dispatch] = useActionState(createExpenseWithBudgetId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success) {
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
                Agregar Gasto
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>

            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispatch}
            >

                <ExpenseForm />

                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Registrar Gasto'
                />
            </form>
        </>
    )
}