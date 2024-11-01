import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ size, styleButton = {}, styleTextButton, textButton, disabled, className, ...rests }) => {
  
  
  return (
    <Button
      className={className}
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : (styleButton.background || 'rgb(255, 57, 69)')
      }}
      size={size}
      
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
