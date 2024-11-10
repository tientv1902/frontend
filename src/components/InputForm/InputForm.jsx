import React from 'react';
import { Input } from 'antd';
import './InputForm.css';

const InputForm = (props) => {
    const { placeholder = 'Input text', ...rests } = props;
    const handleOnChangeInput = (e) => {
        props.onChange(e.target.value);
    };
    
    return (
        <Input
            className="input-style"
            placeholder={placeholder}
            value={props.value}
            {...rests}
            onChange={handleOnChangeInput}
        />
    );
};

export default InputForm;
