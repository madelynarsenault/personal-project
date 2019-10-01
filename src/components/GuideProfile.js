import React from "react";
import axios from 'axios';
import Post from "./Post";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import {updateUser} from "../redux/userReducer"
import {Link} from "react-router-dom";


class GuideProfile extends React.Component {
    constructor(){
    super()
    this.state ={
        postTitle: "",
        postComment: "",
        url:"",
        picture2:"",
        picture3:"",
        previousTours: [],
        redirect: false
    }
}
    componentDidMount(){
        this.grabPosts();
    }
    updateTours = pastTour => {
        this.setState({previousTours: pastTour})
    }

    grabPosts = () => {
         return axios.get("/api/guide/posts").then(response => {
            this.setState({previousTours: response.data})
        })
    }

    handleClick = e => {
        console.log(this.props.reducer)
        axios.post("/api/post", {
            postTitle: this.state.postTitle,
            url: this.state.url,
            postComment: this.state.postComment,
            picture2: this.state.picture2,
            picture3: this.state.picture3,
            userId: this.props.reducer.id
        }).then( () => {
            this.grabPosts();
        })
    }
            logout=()=> {
                axios.get('/auth/logout').then(() => {
                    this.props.updateUser({})
                    this.setState({redirect: true})
                })
                .catch(err => console.log(err))
        
    }
    checkUploadResult = (error,resultEvent) => {
        if (resultEvent.event === "success") {
            console.log("Picture uploaded successfully")
            console.log(resultEvent.info.url);
            this.setState({url: resultEvent.info.url});
        }
    };

    render(){
        let sortedArr = this.state.previousTours.sort((a, b) => {
            return a.id - b.id;
        });
        if(this.state.redirect === true){
            return <Redirect to ="/"/>
        }
        // cloudinary stuff dawg
        const widget = window.cloudinary.createUploadWidget(
            {
            cloudName: "tokyo-tours",
            uploadPreset: "dqfttusm",
            sources: ["local", "url", "dropbox", "facebook", "instagram"]
            },
            (error, result) => {
            this.checkUploadResult(error, result);
            });
    return (
        <>
        <div className="guideHeader">
            <div className="guideDiv">
            <img className="guideGold" src="https://res.cloudinary.com/tokyo-tours/image/upload/v1569944490/PNGIX.com_paint-brush-stroke-png_26857_uquxaa.png"/>
        <nav className="navBarGuide">
                    <ul className="listBarGuide">
                        <Link className="loginLinkGuide"to="/">
                        <li>Home</li>
                        </Link>
                        <Link className="aboutLinkGuide"to="/about">
                        <li>About</li>
                        </Link>
                        <Link className="tourLinkGuide" to="/tours">
                        <li>Tours</li>
                        </Link>
                    </ul>
            </nav>
            </div>
        </div>
            <div className="createTour">
        <h1>Create a Tour</h1>
        <input placeholder="Tour Title"
        className="title"
        onChange={e => this.setState({postTitle: e.target.value})} />
        <textarea className="info" placeholder="Tour information"
        onChange={e => this.setState({postComment: e.target.value})}></textarea>
        {/* <input placeholder="Image"
        className="pic1"
        onChange={e => this.setState({picture1: e.target.value})} /> */}
        {/* <input placeholder="Image"
        className="pic2"
        onChange={e => this.setState({picture2: e.target.value})} />
        <input placeholder="Image"
        className="pic3"
        onChange={e => this.setState({picture3: e.target.value})} /> */}
        <button onClick ={() =>widget.open()}>Add A Picture</button>
        <button onClick ={this.handleClick}>Post Tour</button>
        <button onClick={this.logout}>Logout</button>
        </div>
        <div className="postTourGuide">
        {this.state.previousTours.map(post => {
            console.log(this.props.reducer)
            return(
                <>
                <Post key={post.id} postTitle={post.title}
                postComment={post.info} 
                url={post.picture1}
                picture2={post.picture2}
                picture3={post.picture3}
                userId={this.props.reducer.id}
                onGuideProfile={true}
                id={post.id}
                updateTours={this.updateTours}/>
                   </>
                  )
              })}
            </div>
        </>
    )
  }
}

function mapStateToProps(reduxState){
    return{
       reducer: reduxState.user
    }

}


export default connect(mapStateToProps,{ 
updateUser
})(GuideProfile);