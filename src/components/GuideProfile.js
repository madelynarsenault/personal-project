import React from "react";
import axios from 'axios';
import Post from "./Post";

class GuideProfile extends React.Component {
    constructor(){
    super()
    this.state ={
        postTitle: "",
        postComment: "",
        picture1:"",
        picture2:"",
        picture3:"",
        previousTours: []
    }
}
    componentDidMount(){
        this.grabPosts();
    }
    updateTours = pastTour => {
        this.setState({previousTours: pastTour})
    }

    grabPosts = () => {
        axios.get("/api/guide/posts").then(response => {
            this.setState({previousTours: response.data})
        })
    }

    handleClick = e => {
        axios.post("/api/post", {
            postTitle: this.state.postTitle,
            postComment: this.state.postComment
        })
        this.grabPosts();
    }

    render(){
    return (
        <>
        <h1>Create a Tour</h1>
        <input placeholder="Tour Title"
        onChange={e => this.setState({postTitle: e.target.value})} />
        <textarea
        onChange={e => this.setState({postComment: e.target.value})}></textarea>
        <button onClick ={this.handleClick}>Post Tour</button>
        <div>
        {this.state.previousTours.map(post => {
            return(
                <>
                <Post key={post.id} postTitle={post.title}
                postComment={post.comment} 
                showOnGuideProfile={true}
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


export default GuideProfile;