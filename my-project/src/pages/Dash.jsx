import React, { useEffect, useState } from "react";
 import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import { Link } from "react-router-dom";
const Dash = () => {
  const [userinfo, setUser] = useState([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (email) {
      axios.post('https://invoicerly-server.vercel.app/check', { email })
        .then(result => {
          setUser(result.data.data);
        })
        .catch(err => {
          console.error('Error checking user:', err);
        });
    }
  }, [email]);

  return (
    <div className="d-flex">
      <div className="fixed-sidebar       sidem ">
       </div>
      <div className="content-area w-full px-5 scrol">
      <h1 className="text-2xl fw-semibold  py-1 mt-4 text-gray-600 lh-1 ">
        Hello {userinfo.name}
        </h1>
        <h1 className="text-3xl fw-semibold  pb-6  text-gray-700 lh-1 mb-3">
        Welcome back to {userinfo.company}!
        </h1>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-2">
                <h4 className="my-0  font-semibold text-2xl">Profile</h4>
              </div>
              <div className="card-body">
                
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Edit Profile</li>
                   <li>Phone and email support</li>
                  <li>Name: {userinfo.name}</li>
                  <li>Email: {userinfo.email}</li>
                </ul>
            <Link to="/dash/profile">    <button type="button" className="w-100 btn text-white   btn-lg" style={{ backgroundColor: "#1f506c" }}>
                Edit Your Profile
                 </button>
                 </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-2">
                <h4 className="my-0 font-semibold text-2xl">Invoice</h4>
              </div>
              <div className="card-body">
                 
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Create your invoice</li>
                  <li>Send Directly</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
           <Link  to="/dash/invoice">    <button type="button" className="w-100 btn text-white   btn-lg" style={{ backgroundColor: "#1f506c" }}>
Create Invoice                </button> </Link> 
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-2">
                <h4 className="my-0 font-semibold text-2xl">Greeting</h4>
              </div>
              <div className="card-body">
                 
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Create your invoice</li>
                  <li>Send Directly</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
           <Link  to="/dash/greet">    <button type="button" className="w-100 btn text-white   btn-lg" style={{ backgroundColor: "#1f506c" }}>
Generate Greeting   </button> </Link> 
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-2">
                <h4 className="my-0 font-semibold text-2xl">Quotation</h4>
              </div>
              <div className="card-body">
               
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Create quotation</li>
                  <li>Send Directly</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
          <Link to="/dash/quotation">     <button type="button" className="w-100 btn text-white   btn-lg" style={{ backgroundColor: "#1f506c" }}>
                   Create Quotation
                </button>
                </Link> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
