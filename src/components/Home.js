import React from "react";
import {Link} from "react-router-dom"

function Home(props) {
    return (
        <main className ="Home">
            <div>
                
                </div>
        <div>
        <div className="titles">
            <h2 className="welcome">Welcome To</h2>
            <h1 className="tokyo">Tokyo Tours</h1>
            <Link to="/login">
            <button className="findButton">
                    Get Started</button>
                    </Link>
        </div>
        </div>
        </main>
    )
}

export default Home;