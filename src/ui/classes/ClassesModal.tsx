import React, { useState } from 'react'
import { Modal } from '../common/Modal';
import { useServices } from '../services';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { useProperty } from '../hooks/useProperty';
import { TwitterPicker } from 'react-color';
import { ClassPill } from './ClassPill';

export interface ClassesModalProps {
  onClose: () => void
}

export const ClassesModal = ({ onClose }: ClassesModalProps) => {
  const { classStorageService } = useServices()

  const [newClass, setNewClass] = useState('')
  const [selected, setSelected] = useState<string | undefined>(undefined)

  function addClass() {
    if (newClass !== '') {
      classStorageService.addClass(newClass)
    }
  }

  const classes = useProperty(classStorageService.classes, [])

  const selectedClass = classes.find(c => c.name === selected)

  return (
    <MyModal onClose={onClose}>
      <Title>
        Transaction classes
      </Title>
      <Classes>
        {classes.map(c => (
          <div>
            <ClassPill onClick={() => setSelected(c.name)} txClass={c} />
          </div>
        ))}
      </Classes>
      <AddClass>
        <input value={newClass} onChange={e => setNewClass(e.target.value)} />
        <Button onClick={addClass}>Add</Button>
      </AddClass>
      <Details>
        {selectedClass && (
          <>
            <Label>Cases:</Label>
            <Cases>
              {selectedClass.cases.map(c => <p>{c.toString()}</p>)}
            </Cases>
            <Label>Color:</Label>
            <TwitterPicker
              color={selectedClass.color}
              triangle="hide"
              onChangeComplete={color => classStorageService.setColor(selectedClass, color.hex)}
            />
          </>
        )}
      </Details>
    </MyModal>
  )
}

const MyModal = styled(Modal)`
  width: 720px;
  height: 640px;
  display: grid;
  grid-template-areas:
    "title   title"
    "classes details"
    "add     details";
  grid-column-gap: 40px;
  grid-row-gap: 20px;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 1.5fr;
`

const Title = styled.h1`
  grid-area: title;
  font-size: 24px;
`

const Classes = styled.div`
  grid-area: classes;
  border-right: 1px solid lightgray;
  overflow-y: scroll;
`

const AddClass = styled.div`
  grid-area: add;
`

const Details = styled.div`
  grid-area: details;
`

const Label = styled.p`
  text-transform: uppercase;
  color: gray;
  margin-bottom: 8px;
`

const Cases = styled.div`
  height: 300px;
  overflow-y: scroll;
  margin-left: 16px;
`
