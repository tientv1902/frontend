import React, { useCallback, useEffect, useState } from "react";
import { Button, Typography, Form, Input, message } from "antd";
import "./AdminUser.css";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import EditModalComponent from "../EditModalComponent/EditModalComponent";
import { useSelector } from "react-redux";
import ModalCheckDelete from "../ModalCheckDelete/ModalCheckDelete";
import UserTable from "../UserTable/UserTable";

const { Title } = Typography;

const AdminUser = (props) => {

  const [rowSelected, setRowSelected] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const user = useSelector((state) => state?.user);

  const [formEdit] = Form.useForm();


  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data || {};
    if (!id) {
      console.error("ID not found in data:", data);
      return Promise.reject("ID is missing");
    }
    return UserService.updateUser(id, rests, token);
  });
  

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const handleDeleteUser = (id) => {
    setUserIdToDelete(id);
    setIsModalOpenDelete(true);
  };

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };


  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const {
    data: users,
    isPending: isPendingUsers,
    refetch,
  } = useQuery({ queryKey: ["user"], queryFn: getAllUsers });


  const handleCancelUpdate = useCallback(() => {
    setIsOpenModal(false);
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,

    });

    formEdit.resetFields();
  }, [formEdit]);


  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    setIsPendingUpdate(true);
    try {
      const res = await UserService.getDetailsUser(rowSelected);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          isAdmin: res?.data?.isAdmin,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsPendingUpdate(false); 
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      formEdit.setFieldsValue(stateUserDetails);
    }
  }, [isOpenModal, stateUserDetails, formEdit]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsUser = (rowSelected) => {
    if (rowSelected) {
      setIsPendingUpdate(true);
      fetchGetDetailsUser(rowSelected);
      console.log("rowSelected in handleDetailsUser:", rowSelected); 
    }
    setRowSelected(rowSelected);
    setIsOpenModal(true);
  };
  

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "Ok") {
      message.success("User updated successfully!");
      handleCancelUpdate();
    } else if (isErrorUpdated) {
      message.error(dataUpdated?.message || "Failed to update user.");
    }
  }, [isSuccessUpdated, handleCancelUpdate, isErrorUpdated, dataUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "Ok") {
      message.success("User updated successfully!");
      handleCancelUpdate();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted, handleCancelUpdate, isErrorDeleted, dataDeleted]);

  const handleUpdateUser = async () => {
    if (!rowSelected) {
      console.error("RowSelected is missing, cannot update.");
      return;
    }
    const response = await mutationUpdate.mutateAsync({
      id: rowSelected,
      token: user?.access_token,
      ...stateUserDetails,
    });
    if (response?.status === "Ok") {
      await refetch();
      handleCancelUpdate();
    }
  };
  

  const handleConfirmDelete = async () => {
    if (userIdToDelete) {
      const response = await mutationDeleted.mutateAsync({
        id: userIdToDelete,
        token: user?.accessToken,
      });
      if (response?.status === "Ok") {
        message.success("User deleted successfully!");
        await refetch();
      } else {
        message.error("Failed to delete the user.");
      }
      setIsModalOpenDelete(false);
    }
  };

  return (
    <div className="admin-user-container">
      <Title level={2} className="title">
        User Management
      </Title>

      <UserTable
        users={users?.data}
        isPending={isPendingUsers}
        handleDetailsUser={handleDetailsUser}
        handleDeleteUser={handleDeleteUser}
        pagination={{ pageSize: 5 }}
      />
      <EditModalComponent
        title="Edit User"
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setRowSelected("");
        }}
      >
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form layout="vertical" 
          onFinish={handleUpdateUser} 
          form={formEdit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the user name" },
              ]}
            >
              <Input
                placeholder="Enter your name"
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input
                placeholder="Enter your email"
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone" }]}
            >
              <Input
                type="number"
                placeholder="Enter your phone"
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item className="right-align">
              <Button type="primary" htmlType="submit">
                Update User
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </EditModalComponent>

      <ModalCheckDelete
        title="Delete User"
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleConfirmDelete}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Do you want to delete this user?</div>
        </Loading>
      </ModalCheckDelete>
    </div>
  );
};

export default AdminUser;
