import React from "react";
import axios from 'axios';
import Post from "./Post";
import {Link} from "react-router-dom";
import {updateUser} from "../redux/userReducer";
import {connect} from 'react-redux';



class TourListings extends React.Component {
    constructor(){
    super()
    this.state ={
        posts: []
    }}
    componentDidMount(){
        axios.get("/api/posts").then(response => {
            this.setState({posts: response.data})
        })
    }
    update =(posts)=> {
        this.setState({posts: posts})
    }
    render() {
        let sortedArr = this.state.posts.sort((a, b) => {
            return a.id - b.id;
        });
        console.log(this.props)
        return (
            <>
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
                            {
                            this.props.user.isGuide === true ?
                            <Link className="profileLinkTour" to="/guide">
                            <li>Profile</li>
                            </Link>
                            :
                            this.props.user.isGuide === false ?
                            <Link className="profileLinkTour" to="/user">
                            <li>Profile</li>
                            </Link>
                            :
                            null
                            }
                        </ul>
                </nav>
                </div>
            </div>
            <div className="tourPosts">
            {this.state.posts.map((val, i) => {
                
                return <Post
                key={i}
                postTitle={val.title}
                postComment={val.info}
                update={this.update}
                url={val.picture1}
                onGuideProfile={false} />
            })}
            </div>
            </>
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
})(TourListings);