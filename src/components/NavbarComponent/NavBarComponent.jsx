import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService"; // Adjust the import path
import TypeProduct from "../../components/TypeProduct/TypeProduct"; // Ensure TypeProduct is correctly imported
import "./NavBarComponent.css";

const NavBarComponent = () => {
  const [categoryProduct, setCategoryProduct] = useState([]); 

  const fetchCategoryProduct = async () => {
    const res = await ProductService.getCategoryProduct();
    if (res?.status === 'OK') {
      setCategoryProduct([...res?.data]); 
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []); 

  return (
    <div>
      <h4 className="wrapper-label-text">Category</h4>
      <div className="wrapper-content">
        {categoryProduct.length > 0 ? (
          categoryProduct.map((item) => (
            <TypeProduct name={item} key={item} />
          ))
        ) : (
          <span>No categories available</span>
        )}
      </div>
    </div>
  );
};

export default NavBarComponent;
