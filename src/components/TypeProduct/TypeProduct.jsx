import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TypeProduct.css';  

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()

  const handleCategory = (type) => {
      const formattedType = type.normalize('NFD').replace(/ /g, '_')
      navigate(`/product/${formattedType}`, { state: type })
  }

  return (
    <div
      className="type-product-item"
      onClick={() => handleCategory(name)}
    >
      {name}
    </div>
  )
}

export default TypeProduct;
