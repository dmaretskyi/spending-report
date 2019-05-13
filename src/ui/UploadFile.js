import React, { useRef } from 'react'

export const UploadFile = ({ onUpload }) => {
  const inputRef = useRef(null)

  const handleChange = async () => {
    if (!inputRef.current.files[0]) return

    const reader = new FileReader()
    reader.onload = e => onUpload(e.target.result)

    reader.readAsText(inputRef.current.files[0], 'windows-1250')
  }

  return (
    <input ref={inputRef} onChange={handleChange} type="file" />
  )
}
