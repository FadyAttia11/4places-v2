import React, { useState } from 'react'
import axios from 'axios'

const Users = () => {

    const [users, setUsers] = useState([])

    const fetchAllUsers = () => {
        const request = axios.get('api/users/all')
                    .then(response => response.data)

        return request
    }

    const handleShowAllUsers = async () => {
        const response = await fetchAllUsers()
        await setUsers(response)
        console.log(users) //debugging
    }

    return (
        <div>
            <h1>Users Page</h1>
            <button onClick={handleShowAllUsers}>Show All Users</button>
            <h3>
                {users !== [] && users.map((data, key) => {
                    return (
                    <div key={key}>
                        <p className={{ padding: "50px"}}>
                            {data.name}
                        </p>
                    </div>
                    );
                })}
            </h3>
        </div>
    )
}

export { Users as default }