import React, { useState } from 'react'
import { Modal } from '../common/Modal';
import { useServices } from '../services';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { useProperty } from '../hooks/useProperty';

export interface ClassesModalProps {
  onClose: () => void
}

export const ClassesModal = ({ onClose }: ClassesModalProps) => {
  const { classStorageService } = useServices()

  const [newClass, setNewClass] = useState('')

  function addClass() {
    if (newClass !== '') {
      classStorageService.addClass(newClass)
    }
  }

  const classes = useProperty(classStorageService.classes, [])

  return (
    <MyModal onClose={onClose}>
      <List>
        {classes.map(c => (
          <p>{c.name}</p>
        ))}
      </List>
      <input value={newClass} onChange={e => setNewClass(e.target.value)} />
      <Button onClick={addClass}>Add</Button>
    </MyModal>
  )
}

const MyModal = styled(Modal)`
  width: 720px;
  height: 640px;
`

const List = styled.div`

`
