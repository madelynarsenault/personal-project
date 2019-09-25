import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import {updateUser} from "../redux/userReducer";
import {Redirect} from "react-router-dom";

class LoginAndRegister extends React.Component {
    constructor(){
        super()
            this.state ={
                username: "",
                password: "",
                email: "",
                firstName: "",
                lastName: "",
                isGuide: null,
                clickedRegister: false,
                click: false,
                shouldRedirect: false,
                errorMessage: ""
          }
        
    }
     handleChange = e => {
         this.setState({
             [e.target.name]: e.target.value
         })
     }
     handleRegisterClick =  ()=> {
         const {username, password, email, firstName, lastName, isGuide} = this.state;
         

         if(username !== "" && password !== "" && email !=="" && firstName !=="" && lastName !=="" && isGuide !== null){
             console.log("fired1")
             axios.post("/auth/register", {
                 username, password, email, firstName, lastName, isGuide
             })
             .then(response => {
                console.log("fired3")
                 this.props.updateUser({username, email, firstName, lastName, isGuide});
                 this.setState({shouldRedirect: true});
             }).catch(error => {
                console.log("fired4")
                 this.setState({errorMessage: error.response.data.error})
             })
         } else {
             console.log("fired2")
             this.setState({click: true})
         }

     }
     handleLoginClick = e => {
         const {username, password} =this.state;
         if(username === "" && password ===""){
             this.setState({click: true})
         } else {
             axios.post('/auth/login', {
                 username, password
             }).then(response => {
                 console.log(response.data.isGuide);
                 this.props.updateUser(response.data);
                 this.setState({shouldRedirect: true, isGuide: response.data.isGuide})
             }).catch(err => {
                 this.setState({errorMessage: err.response.data.error});
             })
         }
     }


    render(){
        if (this.state.shouldRedirect === true && this.state.isGuide === false){
            return <Redirect to="/user" />
        } else if (this.state.shouldRedirect === true && this.state.isGuide === true){
            return <Redirect to="/guide" />
        }
        return(
            <>
            <div className="loginHeader">
                <h1 className="kanji">トラベル</h1>
                <h1 className="tok">Tokyo Tours</h1>
            </div>
            <div className="login">

            <div>
                {this.state.click === true ? <h1>Fill out all the required fields</h1> : null}
                {this.state.errorMessage !== "" ? <h1>{this.state.errorMessage}</h1> : null}
                <input placeholder="Username"
                name="username"
                className="username"
                onChange={this.handleChange}
                />
                <input placeholder="Password" 
                type="password"
                name="password"
                className="password"
                onChange={this.handleChange} />
            </div>
            <button className ="loginButton"onClick={this.handleLoginClick}>Login</button>
            <button className="registerButton"onClick={() => this.setState({clickedRegister: !this.state.clickedRegister})}>
                {this.state.clickedRegister === true ? "Cancel" : "Register"}
                </button>
                {
                    this.state.clickedRegister === true ?
                    <>
            <input placeholder="First Name"
            name="firstName"
            onChange={this.handleChange} />
            <input placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange} />
            <input placeholder="Email" 
            name="email"
            onChange={this.handleChange}/>
            <div>
                <input
                type="radio"
                value="Guide"
                name="userType" 
                onClick={() => this.setState({isGuide: true})}/>
                <h1>Guide</h1>
                <input type="radio"
                value="Tourist"
                name="userType"
                onClick={() => this.setState({isGuide: false})}/>
                <h6>Tourist</h6>
            </div>
            <button className="signUp" onClick={this.handleRegisterClick}>Sign Up</button>
            </>
            : null
        }
        </div>
            </>
        )
    }











}
export default connect(undefined, {
    updateUser
})(LoginAndRegister);