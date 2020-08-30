import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Home.scss'

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
        <section id="home">
            <div className="home container">
                <div className="brand"><h1><span>4</span>places</h1></div>
                <h2>Find places that suits your mood</h2>
                <form className="search-form" onSubmit={handleSearch}>
                    <input placeholder="Search for a place..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="cta">Search</button>
                </form>

                <h3>Or just help other people find your favourite place by adding it!</h3>
                <button className="add-place-btn" onClick={() => history.push('/addnewplace')}>Add New Place</button>

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
        </section>
    )
}

export { Home as default }