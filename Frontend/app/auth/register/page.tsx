import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '../../components/auth/RegisterForm';

export const medatada: Metadata = {
      title: 'CashTrackr - Crear Cuenta',
      description: 'CashTrackr - Crear Cuenta',
}

export default function Registerpage() {
      return (
            <>
                  <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
                  <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
                  {/* Formulario de registro */}
                  <RegisterForm />
                  {/* de esta forma se puede redireccionar de la pagina de crear cuenta hacia la pagina de login */}
                  <nav className='mt-10 flex flex-col space-y-4'>
                        <Link
                        href='/auth/login'
                        className='text-center text-gray-500'
                        >
                              Ya tienes Cuenta? iniciar Sesion
                        </Link>
                  </nav>
                  {/* de esta forma se puede redireccionar de la pagina de crear cuenta hacia la pagina de olvidaste tu contraseña */}
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