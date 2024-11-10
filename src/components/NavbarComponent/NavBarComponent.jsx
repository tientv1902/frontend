import React from "react";
import "./NavBarComponent.css";

const NavBarComponent = () => {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, index) => {
          return <span className="wrapper-text-value" key={index}>{option}</span>;
        });
      default:
        return null;
    }
  };

  return (
    <div>
      <h4 className="wrapper-label-text">Category</h4>
      <div className="wrapper-content">
        {renderContent("text", ["laptop"])}
      </div>
    </div>
  );
};

export default NavBarComponent;
