import React from 'react'
import styled from 'styled-components';

export interface CircleButtonProps {
  src?: string
  onClick?: () => void
  className?: string
}

export const CircleButton = ({ src, onClick, className }: CircleButtonProps) => (
  <Container className={className} onClick={onClick}>
    <Icon src={src} />
  </Container>
)

const Container = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 12px;
  background-color: red;
`

const Icon = styled.img`
  width: 16px;
  height: 16px;
  color: white;
`
