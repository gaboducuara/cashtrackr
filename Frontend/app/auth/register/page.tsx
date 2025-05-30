import type { Metadata } from 'next';
import RegisterPage from '../../components/auth/RegisterForm';

export const medatada:Metadata = {
  title: 'CashTrackr - Crear Cuenta',
  description: 'CashTrackr - Crear Cuenta',
}

export default function Registerpage() {
return (
<>
      <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
      <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
      {/* Formulario de registro */}
      <RegisterPage/>
</>
      )
}
