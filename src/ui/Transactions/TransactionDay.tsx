import React from 'react'
import styled from 'styled-components'
import { TransactionRow } from './TransactionRow';
import { DayGroup } from '../../services/TransactionGroupingService';
import { Moment } from 'moment';

export interface TransactionDayProps {
  date: Moment
  data: DayGroup
}

export const TransactionDay = ({ date, data }: TransactionDayProps) => (
  <Container>
    <Header>
      <Date>{date.format('YYYY-MMM-DD')}</Date>
      <Amount>{(data.totalGained - data.totalSpent).toFixed(2)} PLN change</Amount>
      <Balance>Resulting balance: {data.resultingBalance.toFixed(2)} PLN</Balance>
    </Header>
    <div>
      {data.transactions.map(t => (
        <TransactionRow key={t.id} transaction={t} />
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
