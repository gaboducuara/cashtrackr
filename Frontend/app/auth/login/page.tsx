import type { Metadata } from 'next';
import Link from 'next/link';

import LoginForm from '@/app/components/auth/LoginForm';

export const metadata: Metadata = {
      title: 'CashTrackr - Iniciar Sesion',
      description: 'CashTrackr - Iniciar Sesion',
}
export default function LoginPage() {
      return (
            <>
                  <h1 className="font-black text-6xl text-purple-950">Iniciar Sesion</h1>
                  <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
                  <LoginForm />
                  <nav className='mt-10 flex flex-col space-y-4'>
                        <Link
                              href='/auth/register'
                              className='text-center text-gray-500'
                        >
                              No Tienes Cuenta? Crea una.
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