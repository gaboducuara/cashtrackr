
import { NextRequest, NextResponse } from 'next/server'

import { verifySession } from '@/src/auth/dal'
import getToken from '@/src/auth/token'

export async function GET(
  request: NextRequest,
    { params }: { params: Promise<{ budgetId: string; expenseId: string }> }
) {

  const { budgetId, expenseId } = await params;

  await verifySession()

  const token = await getToken()

  const url = `${process.env.API_URL}/budget/${budgetId}/expenses/${expenseId}`
  const req = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const json = await req.json()

  if(!req.ok){
    return NextResponse.json(json.error, {status: 403})
  }
  return NextResponse.json(json)
}