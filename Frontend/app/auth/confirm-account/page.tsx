import ConfirmAccountForm from '@/app/components/auth/ConfirmAccountForm';

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Olvidaste tu contraseña?</h1>
      <p className="text-3xl font-bold">aquí puedes <span className="text-amber-500"> Reestablecerla</span>
      </p>
      <ConfirmAccountForm
      />
    </>
  )
}
