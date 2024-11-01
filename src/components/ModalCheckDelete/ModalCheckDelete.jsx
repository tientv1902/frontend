import { Modal } from 'antd'
import React from 'react'

const ModalCheckDelete = ({title = 'Modal', isOpen = false, children, ...rests}) => {
  return (
    <Modal title={title} open={isOpen} {...rests}>
        {children}
    </Modal>
  )
}

export default ModalCheckDelete