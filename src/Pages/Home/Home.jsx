import React from 'react';
import './home.css'
import About from '../About/About';

function Home() {
    

    return (
        <>
          <div className='homeContainer'>
              <h1>XDevs</h1>
              <br />
              <h2>Code Hub</h2>
              <h2>Welcome to XDevs Code Hub</h2>
              <p>This is a platform where developers can share and discover code snippets, projects, and resources.</p> 
          </div>
            <About />
        </>
    )
}

export default Home;