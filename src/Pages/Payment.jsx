import React from 'react'
import Footer from '../Components/Footer_v1/Footer'
import Navbar_animated from '../Components/NabarTest/Navbar_animated'
import Payment_hero from '../Components/payment/Payment_hero'
import { useLocation } from 'react-router-dom';
import Payment_body from '../Components/payment/Payment_body';

function Payment() {
    let { state } = useLocation();
    if (!state) {
        return <div>No item ID provided</div>;
    }
  return (
    <>
        <Navbar_animated/>
        <Payment_hero/>
        <Payment_body item={state}/>
        <Footer/>
    </>
  )
}

export default Payment
