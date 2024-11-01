import React from "react";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
import { Col, Pagination, Row } from "antd";
import './TypeProductPage.css'; // Import the CSS file

const TypeProductPage = () => {
  const onChange = () => {};

  return (
    <div className="type-product-page">
      <div className="type-product-container">
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
          }}
        >
          <Col className="wrapper-navbar" span={4}>
            <NavBarComponent />
          </Col>
          <Col span={20}>
            <div className="wrapper-products">
              <CartComponent />
              <CartComponent />
              <CartComponent />
              <CartComponent />
              <CartComponent />
              <CartComponent />
              <CartComponent />
              <CartComponent />
            </div>
            <Pagination
              defaultCurrent={2}
              total={100}
              onChange={onChange}
              style={{ justifyContent: 'center', marginTop: '10px' }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TypeProductPage;
