import React from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import {updateUser} from "../redux/userReducer";
import {connect} from "react-redux";

class UserLanding extends React.Component {
    constructor(){
        super()
        this.state ={
            purchasedTours: []
        }
    }
    componentDidMount(){
        this.grabPurchased();
    }
    grabPurchased = () => {
        return axios.get('/api/users/purchased').then(response => {
            this.setState({purchasedTours: response.data})
        })
    }
    render(){
        return(
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
                </nav>
                </div>
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
})(UserLanding);