import { useEffect, useState } from "react"
import { JSONFile } from "../types"
import { searchData } from "../services/search"

export function Search ({ initialData }: {initialData: JSONFile[]}) {

    const [ data, setData ] = useState<JSONFile[]>(initialData)
    const [ search , setSearch ] = useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if ( search === '') {
            window.history.pushState({}, '', window.location.pathname)
            return
        }

        window.history.pushState({}, '', `?q=${search}`)
    }, [search])

    useEffect(() => {
        if (!search) {
            setData(initialData) // if no search set the entire file
            return
        }

        searchData(search)
            .then(resp => {
                const newData = resp // We keep what we recover
                if (newData) setData(newData) // and push it in the state
            })
    } , [search, initialData] )

    return (
        <div>
            <h2>Search</h2>

            <form action="">
                <input 
                onChange={handleSearch} 
                type="search" 
                name="search"
                placeholder="Search..."
                />
            </form>

            <div>
                <ul>
                    {
                        data.map(row => (
                            <li key={row.UserID}>
                                <div>
                                    <span><strong>Client</strong>:    {row.FirstName} - {row.Email}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )

}