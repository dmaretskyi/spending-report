import React from 'react'
import { Modal } from '../common/Modal';
import { ClassList } from './ClassList';

export const ClassifyModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible}>
      <ClassList />
    </Modal>
  )
}
