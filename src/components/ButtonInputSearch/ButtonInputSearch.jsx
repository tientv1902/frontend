import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff',
  } = props;

  return (
    <div style={{ display: "flex", border: 'none' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{ backgroundColor: backgroundColorInput, borderRight: 'none' }} 
        {...props}
      />
      <ButtonComponent 
        size={size} 
        style={{
          background: backgroundColorButton,
           
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textButton={textButton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default ButtonInputSearch;
