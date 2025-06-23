import { useParams } from 'next/navigation'
import { useEffect } from "react"
import { verifySession } from '../../../../../../../src/auth/dal'
import getToken from '../../../../../../../src/auth/token'

export async function GET( request: Request, {params} : {params: {budgetId: string, expenseId: string }}){

  const {id} = useParams()
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budget/8/expenses/1`
  }, [])

  await verifySession()
  const token = getToken()
  const url = `${process.env.API_URL}/budget/${params.budgetId}/expenses/${params.expenseId}`
  const req = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const json = await req.json()

  if(!req.ok){
    return Response.json(json.error, {status: 403})
  }

  return Response.json(json)
}