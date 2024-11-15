import { Button } from 'antd';
import React from 'react';
import './ButtonComponent.css'; // Import the CSS file

const ButtonComponent = ({
  size,
  styleButton = {},
  styleTextButton,
  textButton,
  disabled,
  className,
  ...rests
}) => {
  return (
    <Button
      className={`${className} responsive-button`}  // Add the responsive class here
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.background || 'rgb(255, 57, 69)',
      }}
      size={size}
      disabled={disabled}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
