import React, { useEffect } from 'react'
import axios from 'axios'


const Places = () => {

    const fetchAllPlaces = () => {
        const request = axios.get('api/places/all')
                    .then(response => response.data)

        return request
    }

    const handleShowAllPlaces = async () => {
        const response = await fetchAllPlaces()
        console.log(response) //debugging
        return response
    }

    const places = handleShowAllPlaces()

    // useEffect(() => {
    //     autoShowPlaces()
    // },[])

    return (
        <div>
            <h1>Places Page</h1>
            <button onClick={handleShowAllPlaces}>Show All Places</button>
            {true && <p>places</p>}
        </div>
    )
}

export { Places as default }