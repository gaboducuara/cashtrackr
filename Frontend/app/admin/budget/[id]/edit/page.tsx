import { Metadata } from "next"
import Link from "next/link"

import EditBudgetForm from '@/app/components/budget/EditBudgetForm';
import { getBudget } from '@/src/services/budget';

type PageProps = {
  params: Promise <{ id: string }>
}

export async function generateMetadata({ params }: PageProps ): Promise<Metadata> {

  const {id} = await params;
  const budget = await getBudget(id);

  return {
    title: `CashTrackr - ${budget.name}`,
    description: `CashTrackr - ${budget.name}`,
  }
}
export default async function EditBudgetPage({ params }: Readonly <{ params: Promise <{ id: string }>  }> ) {

  const { id } = await params
  const budget = await getBudget(id)

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-purple-950 my-5'>
            Editar Presupuesto: {budget.name}
          </h1>
          <p className="text-xl getBudgetfont-bold">Llena el formulario y crea un nuevo {''}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={'/admin'}
          className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>
      <div className='p-10 mt-10  shadow-lg border '>
        <EditBudgetForm
          budget={budget}
        />
      </div>
    </>
  )
}
