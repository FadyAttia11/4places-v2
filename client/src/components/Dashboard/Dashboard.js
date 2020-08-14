import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Dashboard = () => {

    const [places, setPlaces] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    const fetchMyPlaces = () => {
        const request = axios.get('api/places', { headers })
                    .then(response => response.data)
        return request
    }

    const handleShowMyPlaces = async () => {
        const response = await fetchMyPlaces()
        await setPlaces(response)
        console.log(places) //debugging
    }

    const handleAddNewPlace = async (e) => {
      e.preventDefault()
      axios.post('api/places', {name, description, category}, { headers })
      setName('')
      setDescription('')
      setCategory('')
    }

    return (
        <div>
            <h1>Dashboard Page</h1>
            <form>
              <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
              <input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} />
              <button onClick={handleAddNewPlace}>Add New Place</button>
            </form>
            <button onClick={handleShowMyPlaces}>Show All My Places</button>
            <h3>
                {places !== [] && places.map((data, key) => {
                    return (
                    <div key={key}>
                        <p className={{ padding: "50px"}}>
                            {"Name: " + data.name +
                                " || " +
                                "Description: " + data.description +
                                " || " +
                                "Category: " + data.category}
                        </p>
                    </div>
                    );
                })}
            </h3>
        </div>
    )
}

export { Dashboard as default }