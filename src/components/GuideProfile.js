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
        console.log(pastTour)
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
            picture1: this.state.picture1,
            picture2: this.state.picture2,
            picture3: this.state.picture3,
            userId: this.props.reducer.id
        }).then( () => {
            this.grabPosts();
        })
        
    }

    render(){
    return (
        <>
        <div className="guideHeader"></div>
            <div className="createTour">
        <h1>Create a Tour</h1>
        <input placeholder="Tour Title"
        onChange={e => this.setState({postTitle: e.target.value})} />
        <textarea
        onChange={e => this.setState({postComment: e.target.value})}></textarea>
        <input placeholder="Image"
        onChange={e => this.setState({picture1: e.target.value})} />
        <input placeholder="Image"
        onChange={e => this.setState({picture2: e.target.value})} />
        <input placeholder="Image"
        onChange={e => this.setState({picture3: e.target.value})} />
        <button onClick ={this.handleClick}>Post Tour</button>
        </div>
        <div className="postTourGuide">
        {this.state.previousTours.map(post => {
            return(
                <>
                <Post key={post.id} postTitle={post.title}
                postComment={post.info} 
                picture1={post.picture1}
                picture2={post.picture2}
                picture3={post.picture3}
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