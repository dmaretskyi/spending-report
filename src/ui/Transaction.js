import React, { useState } from 'react'
import styled from 'styled-components'
import { useClasses, match, addClassification } from '../classes';
import { ClassifyModal } from './classes/ClassifyModal';

export const Transaction = ({ id, time, amount, currency, description }) => {
  const classes = useClasses()
  const itemClass = match(classes, description || '')

  // const [modalVisible, setModalVisible] = useState(false)
  function changeClass() {
    addClassification(description)
  }

  return (
    <Container key={id}>
      <Time>{time && time.format('HH:mm')}</Time>
      <Class onClick={changeClass}>{itemClass}</Class>
      <Amount>{amount && amount.toFixed(2)} {currency}</Amount>
      <Description>{description}</Description>
      {/* <ClassifyModal visible={modalVisible} onClose={() => setModalVisible(false)} /> */}
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: row;

  padding: 7px 25px;
  background: white;
  
  border-top: 0.1px solid #DCDDE3;
`

const Time = styled.span`
  width: 60px;
  color: #666666;
`

const Class = styled.span`
  width: 80px;
  color: #5675FF;
`

const Amount = styled.span`
  width: 120px;
  text-align: right;

  font-weight: bold;
`

const Description = styled.span`
  flex: 1;
  margin-left: 20px;
  font-weight: 200;

  color: #666666;
`
