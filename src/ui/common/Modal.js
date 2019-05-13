import React from 'react'
import styled from 'styled-components'

export const Modal = ({ visible, children }) => (
  <>
    {visible && <Container>{children}</Container>}
  </>
)

const Container = styled.div`
  position: fixed;
  width: 500px;
  height: 700px;
  margin: auto;

  background-color: white;
  padding: 20px;
`
