import { useState } from 'react'
import './App.css'
import { uploadFile } from './services/upload'
import { JSONFile } from './types'

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
  const [ jsonFile , setJsonFile ] = useState<JSONFile[]>([])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [ file ] = e.target.files ?? []

    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ( appStatus !== APP_STATUS.READY_UPLOAD || !file ) {
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)

    // call await uploadFile(file)
    try {
      const data = await uploadFile(file)

      setJsonFile(data)

      setAppStatus(APP_STATUS.READY_USAGE)
    } catch (error) {
      console.error('Uploading failed', error)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }

  }


  // jsonFile && console.log(jsonFile)
  

  return (
    <div className='main_container'>

      <h1>File Management</h1>

      <header>
        <form onSubmit={handleSubmit}>
          <input 
            className='file-input'
            onChange={handleInput} 
            disabled={appStatus === APP_STATUS.UPLOADING}
            name='file' // same key that we've in backend 
            type="file" 
            accept=".csv"
          />
          {
            // appStatus === APP_STATUS.READY_UPLOAD && (
              <button 
              className='btn'
              type='submit'
              disabled={appStatus !== APP_STATUS.READY_UPLOAD}
              >Upload</button>
            // )
          }
          
        </form>
      </header>

      <main>

          {
            jsonFile?.map(record => (
              <div key={record.UserID}>
                <div className='name-container'>
                  <span>{record.FirstName}</span>
                  <span>{record.LastName}</span>
                </div>
              </div>
            ))
          }

      </main>

    </div>
  )
}

export default App


