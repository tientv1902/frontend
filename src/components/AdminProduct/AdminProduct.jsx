import React, { useCallback, useEffect, useState } from "react";
import { Button, Typography, Modal, Form, Input, Upload, message } from "antd";
import { ShoppingCartOutlined, UploadOutlined } from "@ant-design/icons";
import "./AdminProduct.css";
import ProductTable from "../ProductTable/ProductTable";
import { getBase64 } from "../../utils";
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import EditModalComponent from "../EditModalComponent/EditModalComponent";
import { useSelector } from "react-redux";
import ModalCheckDelete from "../ModalCheckDelete/ModalCheckDelete";

const { Title } = Typography;

const AdminProduct = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]); 
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isPendingUpdate, setIsPendingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const user = useSelector((state) => state?.user)
  const [form] = Form.useForm()
  const [formEdit] = Form.useForm()
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    discount: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: '',
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    discount: '',
    type: '',
    countInStock: '',
  });

  const mutation = useMutationHooks(
    (data) =>{
      const {
        name,
        price,
        discount,
        description,
        rating,
        image,
        type,
        countInStock
      } = data
      const res = ProductService.createProuct({
        name,
        price,
        discount,
        description,
        rating,
        image,
        type,
        countInStock
      })
      return res
    }
  )

  const mutationUpdate = useMutationHooks(
    
    (data) => {
      const { id, token, ...productData } = data;
      const res = ProductService.updateProduct(id, token, {...productData}); 
      return res;
    }

  );

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id, token } = data;
      const res = ProductService.deleteProduct(id, token)
      return res;
    }

  );
  
  const handleDeleteProduct = (id) => {
    setProductIdToDelete(id); 
    setIsModalOpenDelete(true); 
  };

  const getAllProducts = async () =>{
    const res = await ProductService.getAllProduct()
    return res
  }

  const { data ,isPending, isSuccess, isError } = mutation;
  const { data: dataUpdated ,isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted ,isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted

  const { data: products, isPending: isPendingProducts, refetch } = useQuery({queryKey: ['products'], queryFn: getAllProducts});

  const showModal = () => {
    setIsModalVisible(true); 
  };

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setStateProduct({
      name: '',
      price: '',
      discount: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: '',
    });
    setFileList([]);
    form.resetFields();
  }, [form]);

  const handleCancelUpdate = useCallback(() => {
    setIsOpenModal(false);
    setStateProductDetails({
      name: '',
      price: '',
      discount: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: '',
    });
    setFileList([]);
    form.resetFields();
  }, [form]);


  const handleAddProduct = async () => {
    const response = await mutation.mutateAsync(stateProduct);
    if (response?.status === 'Ok') {
        await refetch(); 
        handleCancel(); 
    }
};


  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async ({ fileList }) => {
    setFileList(fileList); 

    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProduct({
      ...stateProduct,
      image: file ? file.preview : '', 
    });
  };

  const handleImageChangeDetails = async ({ fileList }) => {
    setFileList(fileList); 

    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProductDetails({
      ...stateProductDetails,
      image: file ? file.preview : '', 
    });
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res.data.name,
        price: res.data.price,
        discount: res.data.discount,
        description: res.data.description,
        rating: res.data.rating,
        image: res.data.image,
        type: res.data.type,
        countInStock: res.data.countInStock,
      });
      
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: res.data.image, 
        },
      ]);
    }
    setIsPendingUpdate(false)
  };
  

  useEffect(() => {
    if (isOpenModal) {
      formEdit.setFieldsValue(stateProductDetails);
    }
}, [isOpenModal, stateProductDetails, formEdit]);


  useEffect(() =>{
    if(rowSelected) {
      fetchGetDetailsProduct(rowSelected)
    }
  },[rowSelected])


  const handleDetailsProduct = () => {
    if(rowSelected) {
      setIsPendingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
    setIsOpenModal(true)
  }

  useEffect(() => { 
    if (isSuccess) {
        if (data?.status === 'Ok') { 
            message.success("Product added successfully!");
            handleCancel();
        } else {
            message.error(data?.message || "Failed to add product. Please try again.");
        }
    } else if (isError) {
        message.error("An error occurred. Please try again.");
    }
  }, [isSuccess, isError, data, handleCancel]);

  useEffect(() => { 
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success("Product updated successfully!");
        handleCancelUpdate()
    } else if(isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated, handleCancelUpdate, isErrorUpdated, dataUpdated]);

  useEffect(() => { 
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success("Product updated successfully!");
        handleCancelUpdate()
    } else if(isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDeleted, handleCancelUpdate, isErrorDeleted, dataDeleted]);

  const handleUpdateProduct = async () => {
    const response = await mutationUpdate.mutateAsync({id: rowSelected, token: user?.accessToken, ...stateProductDetails});
    if (response?.status === 'OK') {
        await refetch();
        handleCancelUpdate(); 
    }
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      const response = await mutationDeleted.mutateAsync({ id: productIdToDelete, token: user?.accessToken })
      if (response?.status === 'Ok') {
        message.success("Product deleted successfully!")
        await refetch()
      } else {
        message.error("Failed to delete the product.")
      }
      setIsModalOpenDelete(false)
    }
  };

  return (
    <div className="admin-product-container">
      <Title level={2} className="title">
        Product Management
      </Title>
      <Button
        type="primary"
        className="add-product-button"
        icon={<ShoppingCartOutlined />}
        onClick={showModal}
      >
        Add Product
      </Button>
      
      <ProductTable
        products={products?.data}
        isPending={isPendingProducts}
        onRow={(record) => ({
          onClick: () => setRowSelected(record._id),
        })}
        handleDetailsProduct={handleDetailsProduct}
        handleDeleteProduct={handleDeleteProduct}
        pagination={{ pageSize: 5 }} 
      />

      <Modal
        title="Add New Product"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isPending={isPending}>
          <Form layout="vertical" 
          onFinish={handleAddProduct} 
          form={form}
          >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter the product name" }]}
          >
            <Input
              placeholder="Enter product name"
              value={stateProduct.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Product Price"
            name="price"
            rules={[{ required: true, message: "Please enter the product price" }]}
          >
            <Input
              type="number"
              placeholder="Enter product price"
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Discount Product"
            name="discount"
            rules={[{ required: true, message: "Please enter the discount" }]}
          >
            <Input
              placeholder="Enter discount"
              value={stateProduct.discount}
              onChange={handleOnchange}
              name="discount"
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="type"
            rules={[{ required: true, message: "Please enter the product category" }]}
          >
            <Input
              placeholder="Enter product category"
              value={stateProduct.type}
              onChange={handleOnchange}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Quantity in stock"
            name="countInStock"
            rules={[{ required: true, message: "Please enter the product quantity in stock" }]}
          >
            <Input
              placeholder="Enter product quantity in stock"
              value={stateProduct.countInStock}
              onChange={handleOnchange}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please enter the product rating" }]}
          >
            <Input
              placeholder="Enter product rating"
              value={stateProduct.rating}
              onChange={handleOnchange}
              name="rating"
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              placeholder="Enter product description"
              value={stateProduct.description}
              onChange={handleOnchange}
              name="description"
            />
          </Form.Item>

          <Form.Item 
            label="Upload Image" 
            name="image"
            rules={[{ required: true, message: "Please upload image" }]}
          >
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              fileList={fileList} 
              onChange={handleImageChange}
              beforeUpload={() => false} 
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="right-align">
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
          </Form>
        </Loading>
        
      </Modal>
      <EditModalComponent 
      title="Edit Product" 
      isOpen={isOpenModal} 
      onClose={() => {
        setIsOpenModal(false);
        setRowSelected('');  
        setFileList([]);
      }}>
        <Loading isPending={isPendingUpdate || isPendingUpdated} >
          <Form layout="vertical" 
          onFinish={handleUpdateProduct} 
          form={formEdit}>
          <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: "Please enter the product name" }]}
      >
        <Input
          placeholder="Enter product name"
          value={stateProductDetails.name}
          onChange={handleOnchangeDetails}
          name="name"
        />
      </Form.Item>
      <Form.Item
        label="Product Price"
        name="price"
        rules={[{ required: true, message: "Please enter the product price" }]}
      >
        <Input
          type="number"
          placeholder="Enter product price"
          value={stateProductDetails.price}
          onChange={handleOnchangeDetails}
          name="price"
        />
      </Form.Item>
      <Form.Item
        label="Discount Product"
        name="discount"
        rules={[{ required: true, message: "Please enter the discount" }]}
      >
        <Input
          placeholder="Enter discount"
          value={stateProductDetails.discount}
          onChange={handleOnchangeDetails}
          name="discount"
        />
      </Form.Item>
          <Form.Item
            label="Category"
            name="type"
            rules={[{ required: true, message: "Please enter the product category" }]}
          >
            <Input
              placeholder="Enter product category"
              value={stateProductDetails.type}
              onChange={handleOnchangeDetails}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Quantity in stock"
            name="countInStock"
            rules={[{ required: true, message: "Please enter the product quantity in stock" }]}
          >
            <Input
              placeholder="Enter product quantity in stock"
              value={stateProductDetails.countInStock}
              onChange={handleOnchangeDetails}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please enter the product rating" }]}
          >
            <Input
              placeholder="Enter product rating"
              value={stateProductDetails.rating}
              onChange={handleOnchangeDetails}
              name="rating"
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              placeholder="Enter product description"
              value={stateProductDetails.description}
              onChange={handleOnchangeDetails}
              name="description"
            />
          </Form.Item>

          <Form.Item 
            label="Upload Image" 
            name="image"
            rules={[{ required: true, message: "Please upload image" }]}
          >
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              fileList={fileList} 
              onChange={handleImageChangeDetails}
              beforeUpload={() => false} 
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="right-align">
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
          </Form>
        </Loading>
      </EditModalComponent>
      <ModalCheckDelete 
        title="Delete Product" 
        open={isModalOpenDelete} 
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleConfirmDelete} 
      >
        <Loading isPending={isPendingDeleted}>
          <div>Do you want to delete this product?</div>
        </Loading>
      </ModalCheckDelete>
      
    </div>
  );
};

export default AdminProduct;
