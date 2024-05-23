import { useState } from 'react'
import './App.css'

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  READY_UPLOAD: 'ready_upload',
  UPLOADING: 'uploading',
  READY_USAGE: 'ready_usage',
} as const

type AppStatusType = typeof APP_STATUS[ keyof typeof APP_STATUS] // Or repeat idle ... 1 by 1


function App() {

  const [ appStatus , setAppStatus ] = useState<AppStatusType>(APP_STATUS.IDLE)
  const [ file , setFile ] = useState<File | null>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [ file ] = e.target.files ?? []

    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }

  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ( appStatus !== APP_STATUS.READY_UPLOAD || !file ) {
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)

    // call await uploadFile(file)

  }


  return (
    <div className='main_container'>

      <h1>File Management</h1>

      <main>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleInput} 
            disabled={appStatus === APP_STATUS.UPLOADING}
            name='file' // same key that we've in backend 
            type="file" 
            accept=".csv" 
          />
          {
            appStatus === APP_STATUS.READY_UPLOAD && (
              <button type='submit'>Upload</button>
            )
          }
          
        </form>
      </main>

    </div>
  )
}

export default App


