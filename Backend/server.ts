import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

const app = express()
// const port = process.env.PORT ?? 3000

app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }) 

let userData: Array<Record<string , string>> = []

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`)
// })

// Required endpoints -> (post & get)

app.post('/api/files', upload.single('file'), async (req, res) => {

    // 1- Extract the files from the request
        const { file } = req

    // 2- Validate that we've files
        if( !file ){
            return res.status(500).json({ message: 'File is required' })
        }

    // 3- Validate mimetype
        if( file.mimetype !== 'text/csv' ) {
            return res.status(500).json({ message: 'File must be CSV' })    
        }
        
    // 4- Transform the file to string
        let json: Array<Record<string, string>>
        try {
            const csv = Buffer.from( file.buffer ).toString('utf-8')
            console.log(csv)

            // 5- Transform the string to JSON
                json = csvToJson.fieldDelimiter(',').csvStringToJson(csv)

        } catch (error) {
            return res.status(500).json({ message: 'Error parsing the file ' })
        }
    
    // 6- Save the JSON to db or memory
        userData = json
    
    // 7- Return 200 with the message and the JSON data
        return res.status(200).json({ data: json , message: 'The file was successfully uploaded'})
})

app.get('/api/users', async (req, res) => {

    // 1. Extract the query param 'q' from the request
        const { q } = req.query

    // 2. Validate that we've the query param
        if( !q ) {
            return res.status(500).json({ message: 'Query param "q" is required' })
        }

    // 3. Filter the data from the db or memory
        const search = q.toString().toLowerCase()
        const filteredData = userData.filter(row => {
            return Object
                .values(row)
                .some(values => values.toLowerCase().includes(search))
        })

    // 4. Return 200 with the filtered data
        return res.status(200).json({ data: filteredData })
})