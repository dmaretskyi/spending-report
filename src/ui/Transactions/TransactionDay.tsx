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
      <Date>{date.format('ddd MMM-DD')}</Date>
      <Amount>{(data.totalGained - data.totalSpent).toFixed(2)} PLN</Amount>
      <div>Resulting balance: {data.resultingBalance.toFixed(2)} PLN</div>
    </Header>
    <Items>
      {data.transactions.map(t => (
        <TransactionRow key={t.id} transaction={t} />
      ))}
    </Items>
  </Container>
)

const Container = styled.div`
  & + & {
    margin-top: 15px
  }
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: white;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 50px 60px 110px 1fr;
  grid-column-gap: 16px;
  align-items: baseline;

  padding: 20px 25px;
  border-bottom: 2px solid #eee;
`

const Items = styled.div`
  padding: 13px 0;
`

const Date = styled.span`
  grid-column: span 2;
`

const Amount = styled.span`
  font-weight: bold;
  text-align: right;
  font-family: 'Ubuntu Mono', monospace;
`
