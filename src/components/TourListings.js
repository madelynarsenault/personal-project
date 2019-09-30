import React from "react";
import axios from 'axios';
import Post from "./Post";



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
        return (
            <>
            <h1>Tokyo Tours</h1>
            {this.state.posts.map((val, i) => {
                return <Post
                key={i}
                postTitle={val.title}
                postComment={val.comment}
                update={this.update}

                url={val.picture1}
                onGuideProfile={false} />
            })}
            </>
        )
    }
}

export default TourListings;