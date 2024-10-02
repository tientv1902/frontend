import React from "react";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage = () => {
  const onChange = () => {};
  return (
    <div style={{width: '100%', background: '#efefef'}}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
      <Row
        style={{
          flexWrap: "nowrap",
          paddingTop: "10px",
        }}
      >
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
          </WrapperProducts>
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
