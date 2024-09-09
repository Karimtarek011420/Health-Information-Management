import React from 'react'
import './Payment_body.css';
import check from "../../assets/check.svg";
import Card_form from './Card_form.jsx'
import credit from '../../assets/membership.png';


function Payment_body(props) {
    const item = props.item;
    const mylist =  item.list_en || [];
    console.log(mylist);
  return (
    <div className="container">
        <div className="payment-con">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 p-md-5 mt-5">
                    <div className="inner payment-section1">
                        <h3 className='payment-header1'>{item.name_en}</h3>
                        {/* <div className="payment-body-img-con">
                            <img src={credit} alt="credit card picture" className='py-0' style={{width:'70%'}}/>
                        </div> */}
                        <hr/>
                        <p className='payment-including'>Includes:</p>
                        <ul className='payment-list lh-lg'>
                            {
                                mylist.map((listitem, index) => (
                                <li key={index} className='d-flex'>
                                    <img src={check} alt='bullet point' className='me-2'/>
                                    <p className='mb-2'>{listitem}</p>
                                </li>
                                ))
                            }
                        </ul>
                        
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="inner payment-section2 my-5 ">
                        <Card_form item={item}></Card_form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment_body
