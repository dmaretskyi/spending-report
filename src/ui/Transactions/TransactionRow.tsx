import React from 'react'
import styled from 'styled-components'
import { ClassifiedTransaction } from '../../services/TransactionGroupingService';
import { useServices } from '../services';
import { ClassPill } from '../classes/ClassPill';
import { useProperty } from '../hooks/useProperty';

export interface TransactionRowProps {
  transaction: ClassifiedTransaction
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { classStorageService } = useServices()
  const txClass = useProperty(classStorageService.getClassOrDefault(transaction.transactionClass), [])
  return (
    <Container key={transaction.id}>
      <Time>{(transaction.time).format('HH:mm')}</Time>
      <Class>
        <ClassPill txClass={txClass} />
      </Class>
      <Amount>{transaction.amount.toFixed(2)} PLN</Amount>
      <Description>{transaction.description}</Description>
    </Container>
  )
}

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
