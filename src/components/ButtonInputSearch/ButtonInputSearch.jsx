import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";
import './ButtonInputSearch.css'; // Import the CSS file

const ButtonInputSearch = ({
  size,
  placeholder,
  textButton,
  backgroundColorInput = '#fff',
  backgroundColorButton = 'rgb(13, 92, 182)',
  colorButton = '#fff',
  ...inputProps 
}) => {
  return (
    <div className="button-input-search-container">
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{
          backgroundColor: backgroundColorInput,
          borderRight: 'none'
        }}
        {...inputProps}
      />
      <ButtonComponent 
        size={size} 
        style={{
          background: backgroundColorButton,
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        textButton={textButton} 
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default ButtonInputSearch;
