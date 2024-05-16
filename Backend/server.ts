import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

// Required endpoints -> (post & get)

app.post('/api/files', async (req, res) => {

    // 1- Extract the files from the request
    // 2- Validate that we've files
    // 3- Validate mimetype
    // 4- Transform the file to string
    // 5- Transform the string to JSON
    // 6- Save the JSON to db or memory
    
    // 7- Return 200 with the message and the JSON data
        return res.status(200).json({ data: [] , message: 'The file was successfully uploaded'})
})

app.get('/api/users', async (req, res) => {

    // 1. Extract the query param 'q' from the request
    // 2. Validate that we've the query param
    // 3. Filter the data from the db or memory
    
    // 4. Return 200 with the filtered data 
        return res.status(200).json({ data: [] })
})