import { Modal } from 'antd';
import React from 'react';

const EditModalComponent = ({ title = 'Edit Product', isOpen = false, onClose, children }) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default EditModalComponent;
