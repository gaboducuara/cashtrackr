import type { Metadata } from 'next';
import ForgotPasswordForm from '../../components/auth/ForgotPassword';

export const medatada:Metadata = {
  title: 'CashTrackr - Olvidé mi Contraseña',
  description: 'CashTrackr - Olvidé mi Contraseña',
}

export default function ForgoPasswordPage() {
return (
<>
      <h1 className="font-black text-6xl text-purple-950">Olvidaste tu contraseña?</h1>
      <p className="text-3xl font-bold">aquí puedes <span className="text-amber-500"> Reestablecerla</span></p>
      {/* Formulario de olvido de contraseña*/}
      <ForgotPasswordForm/>
</>
      )
}
