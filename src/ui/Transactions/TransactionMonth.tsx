import React from 'react'
import { mapValues } from 'lodash'
import { MonthGroup } from '../../services/TransactionGroupingService';
import moment, { Moment } from 'moment'
import { TransactionDay } from './TransactionDay';
import styled from 'styled-components';
import { CategoriesStats } from './CategoriesStats';
import { CumulativeGraph } from './CumulativeGraph';

export interface TransactionMonthProps {
  date: Moment
  data: MonthGroup
}

export const TransactionMonth = ({ date, data }: TransactionMonthProps) => (
  <div>
    <Header>
      <h1>{date.format('MMMM YYYY')}</h1>
      <Spent>Spent: {data.totalSpent.toFixed(2)} PLN</Spent>
      <p>Resulting balance: {data.resultingBalance.toFixed(2)} PLN</p>
      <CategoriesStats data={mapValues(data.categories, 'spent')} />
      <Details>
        <CumulativeGraph data={data} />
      </Details>
    </Header>
    {Object.entries(data.dailyGrouping).map(([date, group]) => (
      <TransactionDay key={date} date={moment(date)} data={group} />
    ))}
  </div>
)

const Header = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  margin-top: 40px;
  margin-bottom: 20px;
  padding: 30px 25px;
`

const Spent = styled.p`
  color: red;
`

const Details = styled.div`
  padding-top: 32px;
`
