import React from "react";
import axios from 'axios';
import Post from "./Post";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import {updateUser} from "../redux/userReducer"


class GuideProfile extends React.Component {
    constructor(){
    super()
    this.state ={
        postTitle: "",
        postComment: "",
        picture1:"",
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
            postComment: this.state.postComment,
            picture1: this.state.picture1,
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

    render(){
        let sortedArr = this.state.previousTours.sort((a, b) => {
            return a.id - b.id;
        });
        if(this.state.redirect === true){
            return <Redirect to ="/"/>
        }
    return (
        <>
        <div className="guideHeader"></div>
            <div className="createTour">
        <h1>Create a Tour</h1>
        <input placeholder="Tour Title"
        className="title"
        onChange={e => this.setState({postTitle: e.target.value})} />
        <textarea className="info" placeholder="Tour information"
        onChange={e => this.setState({postComment: e.target.value})}></textarea>
        <input placeholder="Image"
        className="pic1"
        onChange={e => this.setState({picture1: e.target.value})} />
        <input placeholder="Image"
        className="pic2"
        onChange={e => this.setState({picture2: e.target.value})} />
        <input placeholder="Image"
        className="pic3"
        onChange={e => this.setState({picture3: e.target.value})} />
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
                picture1={post.picture1}
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