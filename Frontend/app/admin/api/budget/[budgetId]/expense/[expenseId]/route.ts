import { verifySession } from '@/src/auth/dal'
import getToken from '@/src/auth/token'
import { useParams } from 'next/navigation'
import { useEffect } from "react"

export async function GET( request: Request, {params} : {params: {budgetId: string, expenseId: string }}){

  const {id} = useParams()
  console.log(id)
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budget/8/expenses/1`
    console.log(url)
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

  console.log(json)
  return Response.json(json)
}