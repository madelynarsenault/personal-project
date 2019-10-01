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
        let sortedArr = this.state.posts.sort((a, b) => {
            return a.id - b.id;
        });
        return (
            <>
            <h1>Tokyo Tours</h1>
            {this.state.posts.map((val, i) => {
                return <Post
                key={i}
                postTitle={val.title}
                postComment={val.info}
                update={this.update}
                url={val.picture1}
                onGuideProfile={false} />
            })}
            </>
        )
    }
}

export default TourListings;