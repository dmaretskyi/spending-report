import React from 'react'
import { Moment } from 'moment'
import styled, { css } from 'styled-components';

export interface MonthSelectorProps {
  months: Moment[]
  selected: number
  onSelected: (value: number) => void
}

export const MonthSelector = ({ months, selected, onSelected }: MonthSelectorProps) => (
  <Container>
    {months.map((m, idx) => (
      <Month onClick={() => onSelected(idx)} selected={idx === selected}>
        <p>{m.format('MMM')}</p>
        <p>{m.format('YY')}</p>
      </Month>
    ))}
  </Container>
)

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px 0px;
`

const Month = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;
  width: 40px;
  
  &:hover {
    background-color: #eeeeee;
  }

  ${p => p.selected && css`
    background-color: red;
    color: white;

    &:hover {
      background-color: darkred;
    }
  `}

  & + & {
    margin-left: 20px;
  }
`
