import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

// function Navi(props){
//     return(
//         <nav>


//         {
//             props.isGuide === true ?
//             <Link to="/guide" >
//                 <button>
//                     Profile
//                 </button>
//             </Link>
//             : props.isGuide === false ?
//             <Link to="/user">
//                 <button>
//                     Profile
//                 </button>
//             </Link>
//             : props.isGuide === undefined ?
//             <Link to="/login" >
//                 <button>
//                     Login
//                 </button>
//             </Link>
//             : null
//         }
//         </nav>
//     )
// }

// function mapStateToProps(reduxState) {
//     console.log(reduxState);
//     return {
//         isGuide: reduxState.user.isGuide
//     }
// }

// export default connect(mapStateToProps)(Navi);
