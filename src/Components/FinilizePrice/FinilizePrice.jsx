"use client"
import { finilizeProduct } from '@/lib/actions';
import React from 'react'
import { useFormState } from "react-dom";

const FinilizePrice = () => {
    const [state, formAction] = useFormState(finilizeProduct,undefined);

  return (
    <form action={formAction}>
    <button>Finilize Price</button>
    </form>
  )
}

export default FinilizePrice