import React from 'react'
import { Dictionary, sortBy } from 'lodash';
import styled from 'styled-components';
import { useServices } from '../services';
import { ClassPill } from '../classes/ClassPill';
import { useProperty } from '../hooks/useProperty';
import { TransactionClass } from '../../models/TransactionClass';

export interface CategoriesStatsProps {
  data: Dictionary<number>
}

export const CategoriesStats = ({ data }: CategoriesStatsProps) => (
  <Container>
    {sortBy(Object.entries(data), x => x[1]).filter(x => x[1] > 0).map(([cat, data]) => (
      <Item category={cat} diff={data} />
    ))}
  </Container>
)

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 1fr;
  grid-column-gap: 32px;
  grid-row-gap: 16px;
  align-items: baseline;
`

const Item = ({ category, diff }: { category: string, diff: number }) => {
  const { classStorageService } = useServices()
  const cs = useProperty(classStorageService.getClass(category), [category])

  return (
    <>
      <ClassPill txClass={cs || new TransactionClass(category, [], '#FFFFFF')} />
      <Amount>{diff.toFixed(2)} PLN</Amount>
    </>
  )
}

const Amount = styled.span`
  text-align: right;
  font-weight: bold;
  font-family: 'Ubuntu Mono', monospace;
`
