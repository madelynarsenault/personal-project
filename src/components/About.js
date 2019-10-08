import React from "react";
import {Link} from "react-router-dom";
import {updateUser} from "../redux/userReducer";
import {connect} from "react-redux";


class About extends React.Component{
        constructor(){
            super()
            this.state ={
                menuOpenStatus: "side-menu"
            }
        }
        toggle = () => {
            console.log("toggle");
            if (this.state.menuOpenStatus === "side-menu-close" || this.state.menuOpenStatus === "side-menu"){
                this.setState({menuOpenStatus: "side-menu-open"});
            } else if (this.state.menuOpenStatus === "side-menu-open"){
                this.setState({menuOpenStatus: "side-menu-close"})
            }}
        render(){
        return(
            <section className="section2">
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
                            <Link className="tourLinkTour" to="/tours">
                            <li>Tours</li>
                            </Link>
                            {
                            this.props.user.isGuide === true ?
                            <Link className="profileLinkTour" to="/guide">
                            <li>Profile</li>
                            </Link>
                            :
                            this.props.user.isGuide === false ?
                            <Link className="profileLinkTour" to="/user">
                            <li>Profile</li>
                            </Link>
                            :
                            null
                            }
                        </ul>
            <li className="hamburger_hidden_by_default">
                            <img 
                            onClick={this.toggle}
                            src="https://img.icons8.com/plasticine/2x/menu.png"
                            alt="hamburger_button"
                            className="hammyButton2"/>
                        </li>
                        <div className={`${this.state.menuOpenStatus} hidden-by-default`}>
                            <Link className="loginHome" to="/">
                            <h1>Home</h1>
                            </Link>
                            <Link className="aboutHome" to="/about">
                            <h1>About</h1>
                            </Link>
                            {
                            this.props.user.isGuide === true ?
                            <Link className="profileLinkTourBar" to="/guide">
                            <h1>Profile</h1>
                            </Link>
                            :
                            this.props.user.isGuide === false ?
                            <Link className="profileLinkTourBar" to="/user">
                            <h1>Profile</h1>
                            </Link>
                            :
                            null
                            }
                            </div>
                </nav>
                </div>
                </div>
                <div className="aboutTitle">
                    <h1>Who Are We?</h1>
                </div>
                <div className="aboutCommentDiv">
                    <h2 className="aboutComment">At Tokyo Tours our commitment is to excel in customer service 
                        and client satisfaction.  The city of Tokyo is a vast and 
                        amazing metropolis full of side streets and ally ways,
                         main thoroughfares and secret destinations and because of 
                         that, we aim to provide you with all the cities delights without 
                         the hassle.  At Tokyo Tours we will take care of the details while 
                         you sit back and experience Tokyo like a native. 
                    </h2>
                </div>
                <div className="aboutFooter">
                   <h1 className="clickHere"> What are you waiting for? Click 
                       <Link className="loginAboutPage" to="/login">
                       <h1 className="here2">here</h1>
                       </Link>
                       <h1 className="adventure">to being your adventure.</h1>
                       </h1>
                    </div>
                </section>
                
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
        })(About);