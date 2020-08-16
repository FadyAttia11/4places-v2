import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Discover = () => {

    const [places, setPlaces] = useState([])
    const [users, setUsers] = useState([])
    const [boolean , setBoolean] = useState(false)

    const fetchAllPlaces = () => {
        const request = axios.get('api/places/all')
                    .then(response => response.data)

        return request
    }

    const setPlaceSorted = (data) => {
        // Comparing based on the name item
        function compare_name(a, b){
            // a should come before b in the sorted order
            if(a.name < b.name){
                    return -1;
            // a should come after b in the sorted order
            }else if(a.name > b.name){
                    return 1;
            // and and b are the same
            }else{
                    return 0;
            } 
        }

        const sortedData = data.sort(compare_name)
        
        console.log(sortedData) //debugging
        setPlaces(sortedData)
    }

    const handleShowAllPlaces = async () => {
        const response = await fetchAllPlaces()
        setPlaceSorted(response)
        setBoolean(true)
        // console.log(response) //debugging
    }

    const fetchAllUsers = () => {
        const request = axios.get('api/users/all')
                    .then(response => response.data)

        return request
    }

    const handleShowAllUsers = async () => {
        const response = await fetchAllUsers()
        setUsers(response)
        console.log(response) //debugging
    }

    return (
        <div>
            <h1>Discover Page</h1>
            <button onClick={handleShowAllPlaces}>Show All Places</button>
        
            <br />
            {boolean && <input placeholder="Filter Places (Not done yet)" />}
                
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
                                "Place Creator: " + data.ownerName}
                        </p>
                    </div>
                    );
                })}
            </h3>

            <button onClick={handleShowAllUsers}>Show All Users</button>
            <h3>
                {users !== [] && users.map((data, key) => {
                    return (
                    <div key={key}>
                        <Link 
                            to={{
                                pathname: `/user/${data._id}`,
                                aboutProps: {
                                    data
                                }
                            }} 
                            className={{ padding: "50px"}}
                        >
                            {data.name}
                        </Link>
                    </div>
                    );
                })}
            </h3>
        </div>
    )
}

export { Discover as default }


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