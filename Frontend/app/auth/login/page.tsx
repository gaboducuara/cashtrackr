import type { Metadata } from 'next';
import LoginForm from '../../components/auth/LoginForm';

export const medatada:Metadata = {
  title: 'CashTrackr - Iniciar Sesion',
  description: 'CashTrackr - Iniciar Sesion',
}

export default function LoginPage() {
return (
<>
      <h1 className="font-black text-6xl text-purple-950">Iniciar Sesion</h1>
      <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">Finanzas</span></p>
      {/* Formulario de login*/}
      <LoginForm/>
</>
      )
}
