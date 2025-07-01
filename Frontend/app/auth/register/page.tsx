import type { Metadata } from 'next';
import Link from 'next/link';

import RegisterForm from '@/app/components/auth/RegisterForm';

export const metadata: Metadata = {
      title: 'CashTrackr - Crear Cuenta',
      description: 'CashTrackr - Crear Cuenta',
}
export default function Registerpage() {
      return (
            <>
                  <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
                  <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
                  <RegisterForm />
                  <nav className='mt-10 flex flex-col space-y-4'>
                        <Link
                        href='/auth/login'
                        className='text-center text-gray-500'
                        >
                              Ya tienes Cuenta? iniciar Sesion
                        </Link>
                  </nav>
                  <nav className='mt-10 flex flex-col space-y-4'>
                        <Link
                        href='/auth/forgotpassword'
                        className='text-center text-gray-500'
                        >
                              Olvidaste tu Contraseña? Reestablecer.
                        </Link>
                  </nav>
            </>
      )
}