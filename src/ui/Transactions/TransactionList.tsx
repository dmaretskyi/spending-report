import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { MonthlyGrouping } from '../../services/TransactionGroupingService';
import { TransactionMonth } from './TransactionMonth';

export interface TransactionsListProps {
  groups: MonthlyGrouping
}

export const TransactionsList = ({ groups }: TransactionsListProps) => (
  <Container>
    {Object.entries(groups).map(([date, group]) => (
      <TransactionMonth key={date} date={moment(date)} data={group} />
    ))}
  </Container>
)

const Container = styled.div`
  max-width: 750px;
  margin: auto;
`
