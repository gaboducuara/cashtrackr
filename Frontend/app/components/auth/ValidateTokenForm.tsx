import { useEffect, useState, Dispatch, SetStateAction, startTransition } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

import { validateToken } from '@/actions/validate-token-actions';

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
}
export default function ValidateTokenForm({ setIsValidToken, token, setToken }: ValidateTokenFormProps) {
  const [isComplete, setIsComplete] = useState(false)
  const validateTokenInput = validateToken.bind(null, token)
  const [state, dispatch] = useActionState(validateTokenInput, {
    errors: [],
    success: ''
  })
  useEffect(() => {
    if(isComplete) {
      startTransition(() => {
        dispatch()
      });
    }
  }, [isComplete, dispatch]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }

    if (state.success) {
      toast.success(state.success)
      setIsValidToken(true)
    }
  }, [state, setIsValidToken])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}