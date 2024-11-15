import React from 'react';
import { Modal } from 'antd';
import './EditModalComponent.css'; 

const EditModalComponent = ({ title = 'Edit Product', isOpen = false, onClose, children }) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="edit-modal"  
    >
      <div className="modal-children">
        {children}
      </div>
    </Modal>
  );
};

export default EditModalComponent;
