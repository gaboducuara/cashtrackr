"use client";

import { useState, useActionState, useEffect, startTransition } from 'react';
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { confirmAccount } from '@/actions/confirm-account-actions';

export default function ConfirmAccountForm() {

  const router = useRouter();

  const [isComplete, setIsComplete] = useState(false);
  const [token, setToken] = useState('')
  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (isComplete) {
      startTransition(() => {
        dispatch();
      });
    }
  }, [isComplete]);
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if(state.success){
      toast.success(state.success, {
        onClose: () => {
          router.push('/auth/login')
        }
      })
    }
  }, [state, router])

  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true);
  }
  return (
    <>
      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
          <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
          <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
          <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
          <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
          <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
        </PinInput>
      </div>
    </>
  )
}
