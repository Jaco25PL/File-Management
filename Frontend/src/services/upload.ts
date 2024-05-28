import { ApiResponse, JSONFile } from '../types'
import { API_HOST } from '../config'

export const uploadFile = async (file: File): Promise< JSONFile[] > => {

    const formData = new FormData() // constructor
    formData.append('file', file)


    try {
        const res = await fetch(`${API_HOST}/api/files`, {
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