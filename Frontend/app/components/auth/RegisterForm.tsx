"use client";

import { useActionState } from 'react';

import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';
import { register } from '@/actions/create-account-actions';

export default function RegisterForm(){

  const [state, dispatch] = useActionState(register, {
    errors:[],
    success:''
  })

  return (
          <form
        className="mt-14 space-y-5"
        noValidate
        action={dispatch}
      >
        {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
        {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Contraseña</label>
          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-2xl"
          >Repetir Contraseña</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
        />
      </form>
  )
}