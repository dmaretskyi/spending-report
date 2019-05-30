import React from 'react'
import styled from 'styled-components'
import { Transaction } from '../../models/Transaction';

export interface TransactionRowProps {
  transaction: Transaction
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => (
  <Container key={transaction.id}>
    <Time>{(transaction.time || transaction.orderDate).format('HH:mm')}</Time>
    <Class>Other</Class>
    <Amount>{transaction.amount.toFixed(2)} PLN</Amount>
    <Description>{transaction.address || transaction.title}</Description>
  </Container>
)

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 60px 110px 1fr;
  grid-column-gap: 16px;
  align-items: baseline;
  padding: 7px 25px;
`

const Time = styled.span`
  color: #666666;
`

const Class = styled.span`
  color: #5675FF;
`

const Amount = styled.span`
  text-align: right;
  font-weight: bold;
  font-family: 'Ubuntu Mono', monospace;
`

const Description = styled.span`
  text-transform: lowercase;
  color: #666666;
`
