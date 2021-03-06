import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './AddNewPlace.scss'

const AddNewPlace = () => {

    const [places, setPlaces] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [keywordsString, setKeywordsString] = useState('')
    const [keywords, setKeywords] = useState(['hi', 'hello'])
    const [boolean, setBoolean] = useState(false)

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

    // // just fires when keywords changes to submit the new place to the db (tweak for the keywords malefunction)
    // useEffect(() => {
    //     console.log(keywords) //just for debugging
    //     if(keywords.length !== 0) {
    //         console.log(keywords) //just for debugging
    //         axios.post('api/places', {name, description, category}, { headers }).then(response => response.data)
    //         console.log('form submitted, and data has just sent to the database!')
    //     }
        
    // }, [keywords])


    const handleAddNewPlace = async (e) => {
        e.preventDefault()
        console.log(keywordsString)
        setKeywords(name.split(' ').concat(keywordsString.split(' ')))
        setBoolean(true)
        // console.log(keywords) //just for debugging
    }

    const sendingNewUserData = () => {
        axios.post('api/places', {name, description, category, keywords}, { headers }).then(response => response.data)
            .then(console.log('form submitted, and data has just sent to the database!'))
        console.log(keywords) //debugging
        setName('')
        setDescription('')
        setCategory('')
        setKeywordsString('')
    }

    return (
        <section id="add-new-place">
            <div className="add-new-place container">
                <h1><span>a</span>dd <span>n</span>ew <span>p</span>lace</h1>
                <form onSubmit={handleAddNewPlace}>
                    <label htmlFor="name">Place Name:</label><br />
                    <input required placeholder="ex: Pyramids" value={name} onChange={(e) => setName(e.target.value.toLowerCase())} /><br />

                    <label htmlFor="name">Description:</label><br />
                    <input required placeholder="ex: Awesome place" value={description} onChange={(e) => setDescription(e.target.value.toLowerCase())} /><br />

                    <label htmlFor="name">Category:</label><br />
                    <input required placeholder="ex: History" value={category} onChange={(e) => setCategory(e.target.value.toLowerCase())} /><br />

                    <label htmlFor="name">keywords:</label><br />
                    <input required placeholder="HINT: makes searching for it alot easier!" value={keywordsString} onChange={(e) => setKeywordsString(e.target.value.toLowerCase())} /><br />
                    <button className="cta">Add New Place</button>
                </form>
                {boolean && <button onClick={sendingNewUserData}>Are You Sure You wanna add this user?</button>}
                <br />
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

export { AddNewPlace as default }