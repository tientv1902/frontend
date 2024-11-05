import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()

  const handleCategory = (type) => {
      const formattedType = type.normalize('NFD').replace(/ /g, '_')
      navigate(`/product/${formattedType}`, {state: type})

  }

  return (
    <div
      style={{ padding: '0 10px', cursor: 'pointer' }}
      onClick={() => handleCategory(name)}
      
    >
      {name}
    </div>
  )
}

export default TypeProduct
