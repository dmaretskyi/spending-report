import React from 'react'
import { TransactionClass } from '../../models/TransactionClass';
import styled from 'styled-components';

export interface ClassPillProps {
  txClass: TransactionClass
  onClick?: () => void
}

export const ClassPill = ({ txClass, onClick }: ClassPillProps) => (
  <Pill onClick={onClick} color={txClass.color}>{txClass.name}</Pill>
);

const Pill = styled.button<{ color: string }>`
  height: 30px;
  border-radius: 50vh;
  font-size: 15px;
  padding: 5px 10px;
  background-color: ${p => p.color};
`
