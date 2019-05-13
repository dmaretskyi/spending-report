import React from 'react'
import { useClasses } from '../../classes';

export const ClassList = () => {
  const classes = useClasses()

  return (
    <div>
      {classes.map(c => (
        <Class {...c} />
      ))}
    </div>
  )
}

const Class = ({ name, matchers }) => (
  <>
    {name} {matchers.length} items
  </>
)
