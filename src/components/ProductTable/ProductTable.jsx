import React, { useState } from 'react';
import { Table as AntTable, Button, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ProductTable.css';

const { Option } = Select;

const ProductTable = ({ products = [], selectionType = 'checkbox', isPending = false, handleDetailsProduct, handleDeleteProduct, ...props }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');


  const categories = Array.from(new Set(products.map(product => product.type)));

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || product.type === selectedCategory;
    const matchPrice =
      priceFilter === 'All' ||
      (priceFilter === 'Above50' && product.price > 50) ||
      (priceFilter === 'Below50' && product.price <= 50);

    return matchSearch && matchCategory && matchPrice;
  });

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating Scale',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.3;

        return (
          <span style={{ fontSize: '12px' }}>
            {Array.from({ length: 5 }, (_, index) => {
              if (index < fullStars) {
                return <span key={index} style={{ color: 'gold' }}>★</span>;
              }
              if (index === fullStars && halfStar) {
                return <span key={index} style={{ color: 'gold' }}>☆</span>;
              }
              return <span key={index} style={{ color: '#ddd' }}>☆</span>;
            })}
          </span>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img 
          src={image} 
          alt="Product" 
          style={{ width: 100, height: 100, objectFit: 'cover' }} 
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',  
      render: (_, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} className="action-button" onClick={() => handleDetailsProduct(record._id)}>Edit</Button>
          <Button type="link" icon={<DeleteOutlined />} danger className="action-button" onClick={() => handleDeleteProduct(record._id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const dataSource = filteredProducts.map((product) => ({
    ...product,
    key: product._id,
  }));

  return (
    <div className="product-table-container">
      <Input.Search
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <Select
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
        style={{ width: 150, marginRight: 16 }}
      >
        <Option value="All">All Categories</Option>
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>

      <Select
        value={priceFilter}
        onChange={(value) => setPriceFilter(value)}
        style={{ width: 150 }}
      >
        <Option value="All">All Prices</Option>
        <Option value="Above50">Above 50</Option>
        <Option value="Below50">50 or below</Option>
      </Select>

      <AntTable 
        columns={columns} 
        dataSource={dataSource} 
        loading={isPending} 
        {...props}
      />
    </div>
  );
};

export default ProductTable;
