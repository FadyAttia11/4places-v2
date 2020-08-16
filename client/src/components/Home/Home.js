import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

    const [searchValue, setSearchValue] = useState('')
    const [places, setPlaces] = useState([])

    let history = useHistory()
    

    const searchInDB = () => {
        const request = axios.post('api/places/find', {searchValue})
                    .then(response => response.data)

        return request
    }

    const handleSearch = async(e) => {
        e.preventDefault()
        const response = await searchInDB()
        await setPlaces(response)
        console.log(response) //debugging
    }

    return (
        <div>
            <h1>Home Page</h1>
            <form onSubmit={handleSearch}>
                <input placeholder="Search for a place..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button>Search</button>
            </form>

            <button onClick={() => history.push('/addnewplace')}>Add New Place</button>

            <h3>
                {places !== [] && places.map((data, key) => {
                    return (
                    <div key={key}>
                        <p className={{ padding: "50px"}}>
                            {"Name: " + data.name +
                                " || " +
                                "Description: " + data.description +
                                " || " +
                                "Category: " + data.category +
                                " || " +
                                "Place Creator: " + data.ownerName +
                                " || " +
                                "Keywords: " + data.keywords}
                        </p>
                    </div>
                    );
                })}
            </h3>
        </div>
    )
}

export { Home as default }