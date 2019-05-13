import React from 'react'
import styled from 'styled-components'
import { Transaction } from './Transaction';

export const TransactionDay = ({ date, transactions, total, currency, balance }) => (
  <Container>
    <Header>
      <Date>{date.format('YYYY-MMM-DD')}</Date>
      <Amount>{total && total.toFixed(2)} {currency}</Amount>
      <Balance>Balance at the end of the day: {balance && balance.toFixed(2)} {currency}</Balance>
    </Header>
    <div>
      {transactions.map(t => (
        <Transaction {...t} description={t.address || t.title} />
      ))}
    </div>
  </Container>
)

const Container = styled.div`
  border-top : 1px solid #373947;
  border-bottom : 1px solid #373947;

  & + & {
    margin-top: 15px
  }
`

const Header = styled.div`
  display: flex;

  padding: 15px 20px;
  background: #EE9BBE;
`

const Date = styled.span`
  width: 100px;
`

const Balance = styled.span`
  flex: 1;
  margin-left: 20px;
`

const Amount = styled.span`
  width: 120px;
  text-align: right;

  font-weight: bold;
`
