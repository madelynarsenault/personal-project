import React from "react";
import axios from 'axios';
import Post from "./Post";
import { connect } from "react-redux";


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
        console.log('grabbed', this.state.previousTours)
         return axios.get("/api/guide/posts").then(response => {
            this.setState({previousTours: response.data})
        })
    }

    handleClick = e => {
        console.log(this.props.reducer)
        axios.post("/api/post", {
            postTitle: this.state.postTitle,
            postComment: this.state.postComment,
            picture1: "hi",
            picture2: "hello",
            picture3: "howdy",
            userId: this.props.reducer.id
        })
        this.grabPosts();
    }

    render(){
        console.log(this.state.previousTours)
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

function mapStateToProps(reduxState){
    console.log(reduxState)
    return{
       reducer: reduxState.user
    }

}


export default connect(mapStateToProps)(GuideProfile);