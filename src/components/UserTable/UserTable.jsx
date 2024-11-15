import React, { useState } from "react";
import { Table as AntTable, Button, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./UserTable.css";

const UserTable = ({
  users = [],
  selectionType = "checkbox",
  isPending = false,
  handleDetailsUser,
  handleDeleteUser,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name- b.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      filters: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      onFilter: (value, record) => record.isAdmin === value,
      render: (isAdmin) => (isAdmin ? "True" : "False"),
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            className="action-button"
            onClick={() => handleDetailsUser(record._id)}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            className="action-button"
            onClick={() => handleDeleteUser(record._id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const dataSource = filteredUsers?.map((users) => ({
    ...users,
    key: users._id,
  }));

  return (
    <div className="product-table-container">
      <Input.Search
        placeholder="Search by any field"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <AntTable
        columns={columns}
        dataSource={dataSource}
        loading={isPending}
        scroll={{ x: 'max-content' }} 
        {...props}
      />
    </div>
  );
};

export default UserTable;
