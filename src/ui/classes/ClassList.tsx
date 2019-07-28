import React from 'react'
import { TransactionClass } from '../../models/TransactionClass';
import styled, { css } from 'styled-components';
import { ClassPill } from './ClassPill'

export interface ClassListProps {
  classes: TransactionClass[],
  selected?: TransactionClass
  onClick?: (value: TransactionClass) => void
  className?: string
}

export const ClassList = ({ classes, selected, onClick, className }: ClassListProps) => (
  <Container className={className}>
    {classes.map(c => (
      <Row selected={selected === c}>
        <ClassPill txClass={c} onClick={onClick && (() => onClick(c))} />
      </Row>
    ))}
  </Container>
)

const Container = styled.div`
  overflow-y: scroll;
`

const Row = styled.div<{ selected?: boolean }>`
  width: 100%;
  padding: 4px 8px;
  border-radius: 8px;

  :hover {
    background-color: #fdf8f1;
  }

  ${p => p.selected && css`
    background-color: antiquewhite !important;
  `}
`
