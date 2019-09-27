import React from "react";
import {Link} from "react-router-dom"

function Home(props) {
    return (
        <main className ="Home">
            <div>
                
                </div>
        <div>
            <nav className="navBar">
                {/* <div> */}
                    <ul className="listBar">
                        <Link className="loginLink"to="/login">
                        <li>Login</li>
                        </Link>
                        <Link className="aboutLink"to="/about">
                        <li>About</li>
                        </Link>
                        <Link className="tourLink" to="/tours">
                        <li>Tours</li>
                        </Link>
                    </ul>
                {/* </div> */}
            </nav>
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