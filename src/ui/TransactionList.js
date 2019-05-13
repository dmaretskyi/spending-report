import React from 'react'
import { TransactionDay } from './TransactionDay';
import moment from 'moment'
import styled from 'styled-components'

export const TransactionsList = ({ groups }) => (
  <Container>
    {Object.entries(groups).map(([date, group]) => (
      <TransactionDay key={date} date={moment(date)} {...group} />
    ))}
  </Container>
)

const Container = styled.div`
  max-width: 750px;
  margin: auto;
  border-left: 1px solid #373947;
  border-right: 1px solid #373947;
`
