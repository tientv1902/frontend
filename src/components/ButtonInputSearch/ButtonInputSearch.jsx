import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputComponent from "../InputComponent/InputComponent";

const ButtonInputSearch = ({
  size,
  placeholder,
  textButton,
  backgroundColorInput = '#fff',
  backgroundColorButton = 'rgb(13, 92, 182)',
  colorButton = '#fff',
  ...inputProps // Tách các thuộc tính dành riêng cho InputComponent
}) => {
  return (
    <div style={{ display: "flex", border: 'none' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{ backgroundColor: backgroundColorInput, borderRight: 'none' }}
        {...inputProps} // Chỉ truyền những thuộc tính dành riêng cho InputComponent
      />
      <ButtonComponent 
        size={size} 
        style={{
          background: backgroundColorButton,
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        textButton={textButton} // Truyền textButton vào ButtonComponent
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default ButtonInputSearch;
