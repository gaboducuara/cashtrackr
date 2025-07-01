"use server"

import { revalidatePath } from 'next/cache'
import { DraftBudgetSchema, SuccessSchema } from '@/src/schemas'
import getToken from '@/src/auth/token';
type ActionStateType = {
    errors: string[]
    success: string
}

export async function CreateBudget(prevState: ActionStateType, formData: FormData) {

    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name')?.toString(),
        amount: formData.get('amount')
    })
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = await getToken()
    const url = `${process.env.API_URL}/budget`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
        })
    })

    const json = await req.json()

    revalidatePath('/admin')
    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}