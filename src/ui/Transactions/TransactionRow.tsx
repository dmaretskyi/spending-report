import React, { useState } from 'react'
import styled from 'styled-components'
import { escapeRegExp } from 'lodash'
import { ClassifiedTransaction } from '../../services/TransactionGroupingService';
import { useServices } from '../services';
import { ClassPill } from '../classes/ClassPill';
import { useProperty } from '../hooks/useProperty';
import { QuickClassDialog } from './QuickClassModal';

export interface TransactionRowProps {
  transaction: ClassifiedTransaction
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { classStorageService } = useServices()
  const txClass = useProperty(classStorageService.getClassOrDefault(transaction.transactionClass), [])

  const [dialogVisible, setDialogVisible] = useState(false)

  function setClass() {
    const classes = classStorageService.classes.get()

    const cs = prompt(`Select class:\n${classes.map(c => c.name).join('\n')}`)
    if (!cs) return
    const matched = classes.filter(c => c.name.startsWith(cs))
    if (matched.length !== 1) return

    const regex = prompt('Enter regex:', `^${escapeRegExp(transaction.description.toLowerCase())}`)
    if (!regex) return

    matched[0].addCase(regex)
    classStorageService.saveClass(matched[0])
  }

  return (
    <Container key={transaction.id}>
      <Time>{(transaction.time).format('HH:mm')}</Time>
      <ClassPill txClass={txClass} onClick={() => setDialogVisible(true)} />
      <Amount>{transaction.amount.toFixed(2)} PLN</Amount>
      <Description>{transaction.description}</Description>
      <QuickClassDialog
        isVisible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        transactionDescription={transaction.description}
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 120px 110px 1fr;
  grid-column-gap: 16px;
  align-items: baseline;
  padding: 7px 25px;
`

const Time = styled.span`
  color: #666666;
`

const Class = styled(ClassPill)`
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
