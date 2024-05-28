import { ApiSearchResponse , JSONFile } from '../types'

export const searchData = async (search: string): Promise< JSONFile[] > => {


    try {
        const res = await fetch(`http://localhost:3000/api/users?q=${search}`, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`)
        }

        const json = await res.json() as ApiSearchResponse
        return json.data

    } catch (error) {
        console.error(error)
        throw error
    }
}