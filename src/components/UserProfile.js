import React from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import {updateUser} from "../redux/userReducer";
import {connect} from "react-redux";
import Post from "./Post";

class UserLanding extends React.Component {
    constructor(){
        super()
        this.state ={
            purchasedTours: []
        }
    }
    componentDidMount(){
        this.grabPurchased();
    }
    grabPurchased = () => {
         axios.get('/api/users/purchased').then(response => {
            this.setState({purchasedTours: response.data})
            console.log(response.data)
        })
    }
    render(){
        console.log(this.state.purchasedTours);
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
                        </ul>
                </nav>
                </div>
                {this.state.purchasedTours.map(post => {
                    console.log(this.props.reducer)
                    console.log(post)
                    return(
                        <main className="postTourGuide">
                        <Post key={post.id} postTitle={post.title}
                        postComment={post.info} 
                        url={post.picture1}
                        picture2={post.picture2}
                        picture3={post.picture3}
                        onGuideProfile={true}
                        id={post.id}
                        updateTours={this.updateTours}/>
                        </main>
                        )
                    })}
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