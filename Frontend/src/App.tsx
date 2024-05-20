import './App.css'

function App() {

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [ file ] = e.target.files ?? []
    console.log(file)
  }


  return (
    <div className='main_container'>

      <h1>File Management</h1>

      <main>
        <input 
          onChange={handleInput} 
          name='file' 
          type="file" 
          accept=".csv" 
        />
      </main>

    </div>
  )
}

export default App


