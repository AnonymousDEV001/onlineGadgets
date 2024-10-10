import ProductSellForm from '@/Components/ProductSellForm/ProductSellForm';
import React from 'react'

const page = ({params}) => {
  const { slug } = params;
  console.log(slug)
  return (
    <ProductSellForm/>
  )
}

export default page