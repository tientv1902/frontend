import React, { useCallback, useEffect, useState } from "react";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
import { Col, Row, Button } from "antd";
import './TypeProductPage.css'; 
import * as ProductService from '../../services/ProductService';
import { useLocation } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounceHook } from "../../hooks/useDebounceHook";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const searchProduct = useSelector((state) => state?.product?.search);
  const debouncedSearch = useDebounceHook(searchProduct, 500);

  const [isPagination, setIsPagination] = useState({
    page: 0,
    limit: 4,
    total: 1,
  });

  const fetchAllProductCategory = useCallback(async (type, page, limit) => {
    setIsPending(true);
    try {
      const res = await ProductService.getAllProductCategory(type, page + 1, limit);
      if (res?.status === 'OK') {
        setProducts((prevProducts) => (page === 0 ? res?.data : [...prevProducts, ...res?.data]));
        setIsPagination((prev) => ({
          ...prev,
          total: res?.total || 1,
        }));
      } else {
        console.error("Failed to fetch products");
      }
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    if (state) {
      fetchAllProductCategory(state, isPagination.page, isPagination.limit);
    }
  }, [state, isPagination.page, isPagination.limit, fetchAllProductCategory]);

  const loadMoreProducts = () => {
    if (products?.length >= isPagination.total) return;

    setIsPagination((prev) => ({
      ...prev,
      limit: prev.limit + 4,
    }));
  };

  const filteredProducts = products
    ?.filter((pro) => debouncedSearch === '' || pro?.name?.toLowerCase()?.includes(debouncedSearch?.toLowerCase()))
    ?.slice(0, isPagination.limit);

  return (
    <Loading isPending={isPending}>
      <div className="type-product-page">
        <div className="type-product-container">
          <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
            <Col className="navbar" span={4}>
              <NavBarComponent />
            </Col>
            <Col span={20}>
              <div className="products">
                {filteredProducts?.map((product) => (
                  <CartComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                  />
                ))}
              </div>
              <div className="button-more">
                <Button
                  disabled={products?.length >= isPagination.total}
                  style={{
                    border: '1px solid rgb(11, 116, 229)',
                    color: 'rgb(11, 116, 229)',
                    backgroundColor: 'white',
                    width: '240px',
                    height: '38px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgb(11, 116, 229)';
                    e.currentTarget.style.backgroundColor = '#d1e1fc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(11, 116, 229)';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                  onClick={loadMoreProducts}
                >
                  See more
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
