import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "../auth/token"
import { BudgetAPIResponseSchema } from "../schemas"
export const getBudget = cache(async (budgetId: string) => {
    const token = getToken()
    const url = `${process.env.API_URL}/budget/${budgetId}`
    console.log(url)
    console.log(token)
    console.log('API_URL:', process.env.API_URL)
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()

    if (!req.ok) {
        notFound()
    }

    const budget = BudgetAPIResponseSchema.parse(json)
    return budget
})