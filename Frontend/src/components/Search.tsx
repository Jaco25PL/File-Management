import { useEffect, useState } from "react"
import { JSONFile } from "../types"

export function Search ({ initialData }: {initialData: JSONFile[]}) {

    const [ data, setData ] = useState(initialData)
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
        //call api to filter data
    } , [] )


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
        </div>
    )

}