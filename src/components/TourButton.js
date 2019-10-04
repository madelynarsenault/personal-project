import axios from "axios"
import React from "react";
import Axios from "axios";
import {updateUser} from "../redux/userReducer";
import {connect} from "react-redux"

class TourButton extends React.Component{
    constructor(){
        super()
        this.state={
            posts: []

        }
    }

    componentDidMount(){
        Axios
        .get("/api/selectedTour")
    }
    render(){
        return(
            // <input type="checkbox" name="tourCheck" />
            
            <h1></h1>
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
})(TourButton);