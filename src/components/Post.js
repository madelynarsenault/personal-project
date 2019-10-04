import React from "react";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import Stripe from "./Stripe";
import TourButton from './TourButton';
import {updateUser} from "../redux/userReducer";
import {connect} from "react-redux";

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            editStatus: false,
            textField: this.props.postTitle,
            textArea: this.props.postComment,
            picture1: this.props.url,
            picture2: this.props.picture2,
            picture3: this.props.picture3
        }
    }
    handleClick = e => {
        console.log(this.props)
        this.setState({editStatus: false});
        axios.put(`/api/post/${this.props.id}`, {
            comment: this.state.textArea,
            title: this.state.textField,
            picture1: this.state.picture1,
            picture2: this.state.picture2,
            picture3: this.state.picture3,
            userId: this.props.userId

        }).then(response => {
            console.log(response)
            this.props.updateTours(response.data)
        })
    }
    handleDelete = () => {
        axios.delete(`/api/post/${this.props.id}`).then(response => {
            this.props.updateTours(response.data);
        })
    }
    handleToken = (token, addresses) => {
        console.log({token, addresses})

    }
    
    render(){
        console.log(this.props);
        console.log(this.state.editStatus, this.props.onGuideProfile)
        return (
            <div className="posts"> 
            
                {
                    this.state.editStatus === false ?
                    <>
                    <h1 className="postTitle1">{this.props.postTitle}</h1>
                    <img className="picture1" src={this.props.url}/>
                    <div className="commentBox">
                    <h2 className="postComment1">{this.props.postComment}</h2>
                    </div>
                    {/* <img className="picture2"src={this.props.picture2}/>
                    <img className="picture3"src={this.props.picture3}/> */}
                    </>
                    :
                    <>
                    <input onChange={e => this.setState({textField: e.target.value})} 
                    defaultValue={this.props.postTitle}/>
                    <textarea onChange ={(e) => this.setState({textArea: e.target.value})}
                    defaultValue={this.props.postComment}>
                    </textarea>
                    <input onChange={e => this.setState({picture1: e.target.value})}
                    defaultValue={this.props.url}/>
                    {/* <input onChange={e => this.setState({picture2: e.target.value})}
                    defaultValue={this.props.picture2} />
                    <input onChange={e => this.setState({picture3: e.target.value})}
                    defaultValue={this.props.picture3} /> */}
                    </>
                }
                {
                    this.props.onGuideProfile === true ?
                    <>
                    {this.state.editStatus === false ?
                    <button  className="editTourButton"onClick={() => this.setState({editStatus: true})}>
                        Edit Tour
                    </button> 
                  :
                  <button onClick={this.handleClick}>
                       Save
                   </button> 
                }
                <button className="deleteButton" onClick={this.handleDelete}>
                    delete
                </button>
                </>
                :
                null
            }
            {
                this.props.onGuideProfile === false ?
               <div>
             <Stripe listing_id={this.props.id}
             user_id={this.props.user.userId}
             />
             {
                 this.props.onGuideProfile === false ?
                 <TourButton />
                 :
                 null
             }
                </div> 
             :
              null
            } 
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
})(Post);