import React, { MouseEvent, ReactNode } from 'react'
import styled from 'styled-components'

export interface ModalProps {
  children: ReactNode
  onClose: () => void
  className?: string
  noClose?: boolean
}

export function Modal({ children, onClose, className, noClose }: ModalProps) {
  function onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalBackdrop onClick={onBackdropClick}>
      <ModalBody className={className}>
        {!noClose && <ModalClose onClick={onClose} />}
        {children}
      </ModalBody>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 245, 245, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBody = styled.div`
  position: relative;
  padding: 30px 40px;
  min-width: 160px;
  min-height: 100px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.2);
`

const ModalClose = styled.button`
  position: absolute;
  top: 30px;
  right: 40px;
  width: 20px;
  height: 20px;

  &::before,
  &::after {
    content: '';
    width: 28px;
    height: 1px;
    border-radius: 1px;
    display: block;
    background-color: #1c1c1c;
    transform: translate(-50%, -50%) rotate(45deg);
    position: absolute;
    top: 10px;
    left: 10px;
  }

  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`
