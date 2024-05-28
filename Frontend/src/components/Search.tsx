import { useEffect, useState } from "react"
import { JSONFile } from "../types"
import { searchData } from "../services/search"
import { useDebounce } from "@uidotdev/usehooks"

export function Search ({ initialData }: {initialData: JSONFile[]}) {

    const [ data, setData ] = useState<JSONFile[]>(initialData)
    const [ search , setSearch ] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search) //get what is after the ? symbol
        return searchParams.get('q') ?? '' // if there is a q paramter get it
    })
    //const searchParams = new URLSearchParams(window.location.search).get('q')
    //create a new object to access to the search part (after ? symbol) of the URL and get the 'q' param

    const debouncedSearch = useDebounce(search, 300) // debounce to avoid multiple api calls

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if ( debouncedSearch === '') {
            window.history.pushState({}, '', window.location.pathname)
            return
        }

        window.history.pushState({}, '', `?q=${debouncedSearch}`) // change the url 
    }, [debouncedSearch])

    useEffect(() => {
        if (!debouncedSearch) {
            setData(initialData) // if no search set the entire file
            return
        }

        searchData(debouncedSearch)
            .then(resp => {
                const newData = resp // We keep what we recover
                if (newData) setData(newData) // and push it in the state
            })
    } , [debouncedSearch, initialData] )

    return (
        <div>
            <h2>Search</h2>

            <form onSubmit={handleSubmit}>
                <input 
                onChange={handleSearch} 
                type="search" 
                name="search"
                placeholder="Search..."
                defaultValue={search}
                />
            </form>

            <div>
                <ul>
                    {
                        data.map(row => (
                            <li key={row.UserID}>
                                <div>
                                    <span><strong>Client</strong>: {row.FirstName} - {row.Email}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )

}