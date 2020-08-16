import React, { useState, useEffect } from 'react'

const UserProfile = (props) => {

    useEffect(() => {
        const user = props.location.aboutProps
        console.log(user)
    }, [])

    return (
        <div>
            <h1>UserProfile</h1>
        </div>
    )
}

export { UserProfile as default }