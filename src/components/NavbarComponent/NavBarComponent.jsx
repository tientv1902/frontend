import React from "react";
import { WrapperContent, WrapperLableText, WrapperTextValue } from "./style";


const NavBarComponent = () => {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return <WrapperTextValue key={index}>{option}</WrapperTextValue>;
        });
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLableText>Category</WrapperLableText>
      <WrapperContent>
        {renderContent("text", ["laptop", "phone"])}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
