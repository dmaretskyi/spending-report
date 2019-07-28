import React from 'react'
import { TransactionClass } from '../../models/TransactionClass';
import styled from 'styled-components';

export interface ClassPillProps {
  txClass: TransactionClass
  onClick?: () => void
  className?: string
}

export const ClassPill = ({ txClass, onClick, className }: ClassPillProps) => (
  <Pill onClick={onClick} color={txClass.color} className={className}>{txClass.name}</Pill>
);

const Pill = styled.button<{ color: string }>`
  /* height: 30px; */
  border-radius: 50vh;
  font-size: 15px;
  padding: 3px 6px;
  background-color: ${p => p.color};
`
