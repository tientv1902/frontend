import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    
    const {placeholder = 'Input text', ...rests} = props
    const handleOnChangeInput = (e) =>{
      props.onChange(e.target.value);
    }
  return (
    <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput}/>
  )
}

export default InputForm