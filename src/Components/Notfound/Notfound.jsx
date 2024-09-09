import React from 'react'
import logo from "../../assets/error1.jpg";
import Footer from '../Footer_v1/Footer';
import Navbar_animated from '../NabarTest/Navbar_animated';

export default function Notfound() {
  return <>

  <div style={{backgroundColor:"#19213D"}}>
  <Navbar_animated/>

  </div>
  
  <div className=' container py-1 w-50 m-auto my-1'>
    <img src={logo} className=' w-100' alt="" />

  </div>
<Footer/>
  
  </>
  
}
