import React from 'react'
import { MonthGroup } from '../../services/TransactionGroupingService';
import moment, { Moment } from 'moment'
import { TransactionDay } from './TransactionDay';
import styled from 'styled-components';

export interface TransactionMonthProps {
  date: Moment
  data: MonthGroup
}

export const TransactionMonth = ({ date, data }: TransactionMonthProps) => (
  <div>
    <Header>
      <h1>{date.format('MMMM YYYY')}</h1>
      <Gained>Gained: {data.totalGained.toFixed(2)} PLN</Gained>
      <Spent>Spent: {data.totalSpent.toFixed(2)} PLN</Spent>
      <p>Resulting balance: {data.resultingBalance.toFixed(2)} PLN</p>
    </Header>
    <div>
      {Object.entries(data.dailyGrouping).map(([date, group]) => (
        <TransactionDay key={date} date={moment(date)} data={group} />
      ))}
    </div>
  </div>
)

const Header = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: white;

  margin-top: 40px;
  margin-bottom: 20px;
  padding: 30px 20px;
`

const Gained = styled.p`
  color: green;
`

const Spent = styled.p`
  color: red;
`
