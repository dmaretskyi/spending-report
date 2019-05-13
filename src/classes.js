import { RegExp } from "core-js";
import { useState, useEffect } from 'react'

function loadClassifiers() {
  try {
    const data = JSON.parse(localStorage.getItem('classes'))
    return data.map(c => ({
      ...c,
      matchers: c.matchers.map(m => new RegExp(m))
    }))
  } catch {
    localStorage.removeItem('classes')
    return []
  }
}

export function match(classes, description) {
  for (const itemClass of classes) {
    if (itemClass.matchers.some(m => description.match(m))) {
      return itemClass.name
    }
  }
  return 'Other'
}

let globalClasses = loadClassifiers()
let onSetCallbacks = []

export function useClasses() {
  const [classifiers, setClassifiers] = useState(globalClasses)

  useEffect(() => {
    const cb = () => setClassifiers(globalClasses)
    onSetCallbacks.push(cb)
    return () => onSetCallbacks = onSetCallbacks.filter(x => x !== cb)
  })

  return classifiers
}

function setClasses(classes) {
  globalClasses = classes
  localStorage.setItem('classes', JSON.stringify(classes.map(c => ({
    ...c,
    matchers: c.matchers.map(m => m.toString().replace(/(^\/|\/[a-zA-Z]*$)/g, ''))
  }))))
  onSetCallbacks.forEach(cb => cb())
}

export function addClassification(transactionName) {
  const className = prompt('Enter class name:')
  if (!className) return

  const regex = prompt('Enter RegExp:', `^${transactionName}`)
  if (!regex) return

  const trClass = globalClasses.find(c => c.name === className) || { name: className, matchers: [] }
  trClass.matchers.push(new RegExp(regex))

  if (globalClasses.indexOf(trClass) === -1) {
    globalClasses.push(trClass)
  }

  setClasses(globalClasses)
}
