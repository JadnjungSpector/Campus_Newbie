// import { ReactComponent as LogoDark } from "../assets/images/logos/CampusNewbieLogoTransparent.jpg";
// import { Link } from "react-router-dom";
import React from 'react';
import { Link } from 'react-router-dom';
import logoDark from '../assets/images/logos/NewCampusNewbieLogoTransparent.png'; // Import the JPEG file

// const Logo = () => {
//   return (
//     <Link to="/">
//       <LogoDark />
//     </Link>
//   );


  const Logo = () => {
    return (
      <Link to="/about">
        <img src={logoDark} alt="Campus Newbie Logo" style={{ width: '145px', height: 'auto' }} />
      </Link>
    );
};

export default Logo;
