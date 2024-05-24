
type Data = Array<Record< string, string >>
interface ApiResponse {
    message: string
    data: Data
}

export const uploadFile = async (file: File): Promise< Data > => {

    const formData = new FormData() // constructor
    formData.append('file', file)

    try {
        const res = await fetch('http://localhost:3000/api/files', {
            method: 'POST',
            body: formData
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`)
        }

        const json = await res.json() as ApiResponse
        return json.data

    } catch (error) {
        console.error(error)
        throw error
    }
}