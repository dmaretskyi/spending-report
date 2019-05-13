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
  display: flex;
  flex-direction: row;

  padding: 7px 25px;
  background: white;
  
  border-top: 0.1px solid #DCDDE3;
`

const Time = styled.span`
  width: 60px;
  color: #666666;
`

const Class = styled.span`
  width: 80px;
  color: #5675FF;
`

const Amount = styled.span`
  width: 120px;
  text-align: right;

  font-weight: bold;
`

const Description = styled.span`
  flex: 1;
  margin-left: 20px;
  font-weight: 200;

  color: #666666;
`
