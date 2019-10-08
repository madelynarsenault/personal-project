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
        redirect: false,
        menuOpenStatus: "side-menu"
    }
}
toggle = () => {
    console.log("toggle");
    if (this.state.menuOpenStatus === "side-menu-close" || this.state.menuOpenStatus === "side-menu"){
        this.setState({menuOpenStatus: "side-menu-open"});
    } else if (this.state.menuOpenStatus === "side-menu-open"){
        this.setState({menuOpenStatus: "side-menu-close"})
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
            this.setState({postTitle: ""})
            this.setState({postComment: ""});
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
            </div>
            <section className="postDiv1">
                <div className="createTour">
                    <h1>Create a Tour</h1>
                    <input placeholder="Tour Title"
                    className="title" value={this.state.postTitle}
                    onChange={e => this.setState({postTitle: e.target.value})} />
                    <textarea className="info" value={this.state.postComment} placeholder="Tour information"
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
                    <button className="addPic"onClick ={() =>widget.open()}>Add A Picture</button>
                    <button className ="addTour"onClick ={this.handleClick}>Post Tour</button>
                    <button className="logoutButton" onClick={this.logout}>Logout</button>
                </div>
                {/* <div> */}
                    {this.state.previousTours.map(post => {
                        console.log(this.props.reducer)
                        return(
                            <main className="postTourGuide">
                            <Post key={post.id} postTitle={post.title}
                            postComment={post.info} 
                            url={post.picture1}
                            picture2={post.picture2}
                            picture3={post.picture3}
                            userId={this.props.reducer.id}
                            onGuideProfile={true}
                            id={post.id}
                            updateTours={this.updateTours}/>
                            </main>
                            )
                        })}
                {/* </div> */}
                </section>
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