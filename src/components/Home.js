import React from "react";
import {Link} from "react-router-dom"

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            menuOpenStatus: "side-menu"
        }
    }
    toggle = () => {
        console.log("toggle");
        if (this.state.menuOpenStatus === "side-menu-close" || this.state.menuOpenStatus === "side-menu"){
            this.setState({menuOpenStatus: "side-menu-open"});
        } else if (this.state.menuOpenStatus === "side-menu-open"){
            this.setState({menuOpenStatus: "side-menu-close"})
        }
    }
    render(){
    return (
        <main className ="Home">
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
                        <li className="hamburger hidden-by-default">
                            <img 
                            onClick={this.toggle}
                            src="https://img.icons8.com/plasticine/2x/menu.png"
                            alt="hamburger_button"
                            className="hamburgerButton"/>
                        </li>
                        <div className={`${this.state.menuOpenStatus} hidden-by-default`}>
                            <h1>Login</h1>
                            <h1>About</h1>
                            <h1>Tours</h1>
                        </div>
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
}}

export default Home;