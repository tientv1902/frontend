import React, { useEffect, useState, useCallback } from 'react';
import './ProfilePage.css';
import { Input, Button, Avatar, Row, Col, Upload } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlide';
import { getBase64 } from '../../utils';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, rests, access_token);
  });
  const { isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  const handleGetDetailsUser = useCallback(async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError, handleGetDetailsUser, user?.id, user?.access_token]);

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, avatar, name, email, phone, address, access_token: user?.access_token });
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', height: 'auto', padding: '50px 0' }}>
      <h1 className="header-profile">User Profile</h1>
      <Loading isPending={isPending}>
        <div className="content-profile">
          <div className="styled-card">
            <Row gutter={[20, 20]}>
              <Col span={24} style={{ textAlign: 'center' }}>
                {avatar ? (
                  <Avatar
                    size={120}
                    src={avatar}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <Avatar size={120} icon={<UserOutlined />} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }} />
                )}
              </Col>

              <Col span={24}>
                <label className="label">Avatar</label>
                <Upload onChange={handleOnChangeAvatar} maxCount={1} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>

              <Col span={24}>
                <label className="label">Name</label>
                <Input id="name" value={name} onChange={handleOnChangeName} style={{ width: '100%', borderRadius: '8px', padding: '10px' }} />
              </Col>

              <Col span={24}>
                <label className="label">Email</label>
                <Input id="email" value={email} onChange={handleOnChangeEmail} style={{ width: '100%', borderRadius: '8px', padding: '10px' }} />
              </Col>

              <Col span={24}>
                <label className="label">Phone</label>
                <Input id="phone" value={phone} onChange={handleOnChangePhone} style={{ width: '100%', borderRadius: '8px', padding: '10px' }} />
              </Col>

              <Col span={24}>
                <label className="label">Address</label>
                <Input id="address" value={address} onChange={handleOnChangeAddress} style={{ width: '100%', borderRadius: '8px', padding: '10px' }} />
              </Col>

              <Col span={24}>
                <Button
                  type="primary"
                  style={{ width: '100%', borderRadius: '8px', padding: '12px 0', fontWeight: 'bold', fontSize: '16px' }}
                  onClick={handleUpdate}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default ProfilePage;
