import React, { useState, useEffect } from 'react'
import { useServices } from '../services';
import { Modal } from '../common/Modal';
import { useProperty } from '../hooks/useProperty';
import { TransactionClass } from '../../models/TransactionClass';
import { ClassList } from '../classes/ClassList'
import styled from 'styled-components';
import { useMutableCallback } from 'react-use-mutable'

export interface QuickClassDialogProps {
  isVisible: boolean
  onClose: () => void
  transactionDescription: string
}

export const QuickClassDialog = ({ isVisible, onClose, transactionDescription }: QuickClassDialogProps) => {
  const { classStorageService } = useServices()
  const classes = useProperty(classStorageService.classes, [])

  const [selectedClass, setSelectedClass] = useState<TransactionClass | undefined>()

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    }
  }, [isVisible])

  const onKeyDown = useMutableCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const classIdx = findInArray(classes, selectedClass)
      const newIdx = Math.min(classIdx + 1, classes.length - 1)
      setSelectedClass(classes[newIdx])
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      const classIdx = findInArray(classes, selectedClass)
      const newIdx = Math.max(classIdx - 1, 0)
      setSelectedClass(classes[newIdx])
      e.preventDefault()
    }
  })

  if (!isVisible) return null
  return (
    <MyModal onClose={onClose} noClose>
      <ClassList classes={classes} selected={selectedClass || classes[0]} />
    </MyModal>
  )
}

const MyModal = styled(Modal)`
    width: 420px;
    height: 500px;
`

function findInArray(arr: TransactionClass[], item: TransactionClass | undefined): number {
  if (!item) return 0
  const idx = arr.findIndex(x => x.equals(item))
  if (idx !== -1) return idx
  return 0
}
