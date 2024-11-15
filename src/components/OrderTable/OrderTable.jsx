import React from "react";
import { Table as AntTable } from "antd";
import './OrderTable.css';

const OrderTable = ({ orders = [], isLoading = false }) => {
  const columns = [
    {
      title: 'User Name',
      dataIndex: ['shippingAddress', 'fullName'],
      key: 'userName',
    },
    {
      title: 'Address',
      dataIndex: ['shippingAddress', 'address'],
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: ['shippingAddress', 'phone'],
      key: 'phoneNumber',
    },
    {
      title: 'Payment Status',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid) => (isPaid ? 'Paid' : 'Unpaid'),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method, record) => (record.isPaid ? 'PayPal' : 'Cash on Delivery'),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Product Names',
      dataIndex: 'orderItems',
      key: 'productNames',
      render: (items) => items.map((item) => item.name).join(', '),
    },
  ];

  const dataSource = orders.map((order) => ({
    ...order,
    key: order._id,
  }));

  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      scroll={{ x: 'max-content' }}
      pagination={{ pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        responsive: true, }}
    />
  );
};

export default OrderTable;
