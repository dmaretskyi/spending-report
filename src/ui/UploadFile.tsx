import React, { useRef } from 'react'

export interface UploadFileProps {
  onUpload: (data: string) => void
}

export const UploadFile = ({ onUpload }: UploadFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = async () => {
    const file = inputRef.current!.files![0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => onUpload((e.target as any).result)

    reader.readAsText(file, 'windows-1250')
  }

  return (
    <input ref={inputRef} onChange={handleChange} type="file" />
  )
}
