import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Places = () => {

    const [places, setPlaces] = useState([])

    const fetchAllPlaces = () => {
        const request = axios.get('api/places/all')
                    .then(response => response.data)

        return request
    }

    const handleShowAllPlaces = async () => {
        const response = await fetchAllPlaces()
        await setPlaces(response)
        console.log(places) //debugging
    }

    // handleShowAllPlaces()

    return (
        <div>
            <h1>Places Page</h1>
            <button onClick={handleShowAllPlaces}>Show All Places</button>
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

export { Places as default }


// {places.map((data, key) => {
//     return (
//     <div key={key}>
//         <p className={{ padding: "50px"}}>
//             {"Name: " + data.name +
//                 " || " +
//                 "Description: " + data.description +
//                 " || " +
//                 "Category: " + data.category}
//         </p>
//     </div>
//     );
// })}

// const DummyData = [
//     {
//         name: 'faculty of engineering',
//         description: 'good place',
//         category: 'education'
//     },
//     {
//         name: 'Cinema Amir',
//         description: 'i love this cinema',
//         category: 'movies'
//     },
//     {
//         name: 'el montaza',
//         description: 'best vacation in town',
//         category: 'picnic'
//     },
// ]