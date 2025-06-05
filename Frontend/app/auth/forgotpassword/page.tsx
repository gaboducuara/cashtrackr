import type { Metadata } from 'next';
import Link from 'next/link';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
export const medatada: Metadata = {
      title: 'CashTrackr - Olvidé mi Contraseña',
      description: 'CashTrackr - Olvidé mi Contraseña',
}

export default function ForgotPasswordPage() {
      return (
            <>
                  <h1 className="font-black text-6xl text-purple-950">Olvidaste tu Contraseña?</h1>
                  <p className="text-3xl font-bold">Aqui puedes<span className="text-amber-500"> reestablecerla. </span></p>
                  {/* Formulario de olvido de contraseña*/}
                  <ForgotPasswordForm />
                  {/* de esta forma se puede redireccionar de la pagina de olvidaste tu Contraseña hacia login */}
                  <nav className='mt-10 flex flex-col space-y-4'>
                        <Link
                              href='/auth/login'
                              className='text-center text-gray-500'
                        >
                              Ya Tienes una Cuenta? Iniciar Sesion.
                        </Link>
                  </nav>
{/* Olvidaste tu Contraseña? Reestablecer. */}
                  {/* de esta forma se puede redireccionar de la pagina de olvidaste tu Consetraseña hacia registro de usuario*/}
                  <nav className='mt-10 flex flex-col space-y-4'>
                        <Link
                              href='/auth/register'
                              className='text-center text-gray-500'
                        >
                              No Tienes Cuenta? Crea una.
                        </Link>
                  </nav>
            </>
      )
}