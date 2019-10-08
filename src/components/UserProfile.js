import React from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import {updateUser} from "../redux/userReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Post from "./Post";

class UserLanding extends React.Component {
    constructor(){
        super()
        this.state ={
            purchasedTours: [],
            menuOpenStatus: "side-menu",
            redirect:false
        }
    }
    componentDidMount(){
        this.grabPurchased();
    }
    componentDidUpdate (prevProps){
        if(prevProps.purchasedTours !== this.state.purchasedTours){
            this.grabPurchased();
        }
    }
    grabPurchased = () => {
         axios.get('/api/users/purchased').then(response => {
            this.setState({purchasedTours: response.data})
            console.log(response.data)
        })
    }
    toggle = () => {
        
        if (this.state.menuOpenStatus === "side-menu-close" || this.state.menuOpenStatus === "side-menu"){
            this.setState({menuOpenStatus: "side-menu-open"});
        } else if (this.state.menuOpenStatus === "side-menu-open"){
            this.setState({menuOpenStatus: "side-menu-close"})
        }
    }
    logout=()=> {
        axios.get('/auth/logout').then(() => {
            this.props.updateUser({})
            this.setState({redirect: true})
        })
        .catch(err => console.log(err))

}
    render(){
        if(this.state.redirect === true){
            return <Redirect to ="/"/>
        }
        return(
            <div className="guideHeader">
                
                <div className="guideDiv">
                <div>
                    <h1 className="guideTokyo">Tokyo Tours</h1>
                <img className="guideGold" src="https://res.cloudinary.com/tokyo-tours/image/upload/v1569944490/PNGIX.com_paint-brush-stroke-png_26857_uquxaa.png"/>
                </div>
            <nav className="navBarGuide">
                        <ul className="listBarGuide">
                            <Link className="loginLinkTour"to="/">
                            <li>Home</li>
                            </Link>
                            <Link className="aboutLinkTour"to="/about">
                            <li>About</li>
                            </Link>
                            <Link className="tourLinkTour" to="/tours">
                            <li>Tours</li>
                            </Link>
                            <button className="logoutButtonUser" onClick={this.logout}>Logout</button>
                        </ul>
                        <li className="hamburger_hidden_by_default">
                            <img 
                            onClick={this.toggle}
                            src="https://img.icons8.com/plasticine/2x/menu.png"
                            alt="hamburger_button"
                            className="hammyButton2"/>
                        </li>
                        <div className={`${this.state.menuOpenStatus} hidden-by-default`}>
                            <Link className="guideLinkHome" to="/">
                            <h1>Home</h1>
                            </Link>
                            <Link className="guideLinkAbout" to="/about">
                            <h1>About</h1>
                            </Link>
                            <Link className="guideLinkTour" to="/tours">
                            <h1>Tours</h1>
                            </Link>
                            </div>
                </nav>
                </div>
                <div className="appearBelow">
                    <h1>Your purchased tours will appear below!</h1>
                </div>
                <div className="postTourUserPage">
                {this.state.purchasedTours.map(post => {
                    return(
                        <Post className="userProfilePost" key={post.id} postTitle={post.title}
                        postComment={post.info} 
                        url={post.picture1}
                        picture2={post.picture2}
                        picture3={post.picture3}
                        onGuideProfile={true}
                        id={post.id}
                        updateTours={this.updateTours}/>
                        )
                    })}
                    </div>
            </div>
            
        )
                        
    }
}
function mapStateToProps(reduxState){
    return{
        user: reduxState.user
    }
}

export default connect(mapStateToProps, {
    updateUser
})(UserLanding);