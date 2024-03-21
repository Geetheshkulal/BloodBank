import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css'
function Navbar({ userEmail}){
    return(
        <>
        <div className="header">
            <div className="custom-navbar">
                <ul>
                    <div className="nav">
                        <div id="head">
                            <a>BLOOD CENTER</a>
                        </div>
                    <li><Link to='/Home'>HOME</Link></li>
                    <li><Link to='/About'>ABOUT US</Link></li>
                    <li><Link to='/Donate'>DONATE</Link></li>
                    <li><Link to='/Service'>SERVICES</Link></li>
                    <li><Link to='/Requestblood'>REQUEST BLOOD</Link></li>
                    <li><Link to='/Contact'>CONTACT</Link></li>
                    <li><Link to='/'>LOG OUT</Link></li>
                    
                 
                    </div>
                    {/* <div className="user-info">
                    <p className="logoname">Welcome,{userEmail}</p>
        
       </div> */}
                    
                </ul>
            </div>
        </div>
        </>
    );
}
export default Navbar;





// function Navbar({ userEmail }) {
//   return (
//     <div className="navbar">
//       <div className="logo">
//         <h1>Healthcare</h1>
//       </div>
//       <div className="nav-links">
//         <a href="/">Home</a>
//         <a href="/Contact">Contact</a>
//         <a href="/Donate">Donate</a>
//         <a href="/Service">Service</a>
//       </div>
//       <div className="user-info">
        
//       </div>
//     </div>
//   );
// }

// export default Navbar;