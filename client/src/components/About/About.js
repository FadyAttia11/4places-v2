import React, { useState } from 'react'
import axios from 'axios'
import './About.scss'

const About = () => {

    return (
        <section id="about">
            <div className="about container">
                <h1><span>A</span>bout Page</h1>
                <h3>some info about us, about how to contact us and what this project or website is all about</h3>
            </div>
        </section>
    )
}

export { About as default }