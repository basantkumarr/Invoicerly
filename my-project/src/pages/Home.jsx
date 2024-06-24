import React from 'react'
import main from "../assets/invoice-header (1).png"
import main2 from "../assets/main2.webp"
import main3 from "../assets/main3.webp"
import main4 from "../assets/mian4.webp"
import Feature from '../components/Feature'
import {  useNavigate}  from "react-router-dom"
import Footer from './Footer'
import axios from 'axios'
 import { useUser } from '@clerk/clerk-react'
 

const Home = () => {
 const navigate=useNavigate()
 const {user}=useUser();
 const email = user?.primaryEmailAddress?.emailAddress;
 
 const handlecheck = async (e) => {
  e.preventDefault();

  // Assuming 'axios' is properly imported or included in your project
  axios.defaults.withCredentials = true; // Enable sending credentials (cookies)

  try {
    const result = await axios.post(
      https://invoicerly-server.vercel.app/check,
      { email }, // Assuming 'email' is defined elsewhere in your code
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result);

    if (result.data.status === "success") {
      navigate("/dash"); // Assuming 'navigate' function is defined for routing
    } else {
      navigate("/signup"); // Redirect to signup page if status is not success
    }
  } catch (err) {
    console.error('Error checking user:', err);
  }
};


  return (
    <div className=' all '>
          <div className="container col-xxl-8 px-4  ">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-3">
        <div className="col-10 mx-auto col-sm-8 col-lg-6">
          <img 
             src={main}
             className="d-block mx-lg-auto img-fluid" 
            alt="Bootstrap Themes" 
            width="750" 
            height="500" 
            loading="lazy" 
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-semibold      text-gray-600 lh-1 mb-3">
          Accounting Software For Modern Businesses
          </h1>
          <p className="lead  text-gray-600    font-semibold ">
          Manage GST Invoicing, GST Accounting,  E-invoicing, E-way Bills,  Expenses, and other financial operations in one place.

</p>
          <div className="d-grid gap-2 d-md-flex mt-3 justify-content-md-start">
           <button type="button" onClick={handlecheck} className="btn btn-outline-secondary  border-cyan-900 text-cyan-900   border-b-4 btn-lg px-4 me-md-2">Get Started</button> 
            </div>
        </div>
      </div>
    </div>



    <h1 className="display-6 fw-semibold  text-center  pt-9 text-gray-800  ">Bookkeeping, Accounting, and Compliance</h1>
    <h1 className=" text-2xl fw-semibold mb-4   text-center pt-2 text-gray-600  ">Your one-stop GST accounting software.
</h1>
<div className="container col-xxl-8 px-4  py-6 ">
      <div className="row flex-lg-row align-items-center g-5 py-3">
        <div className="col-10 mx-auto col-sm-8 col-lg-6">
          <img 
             src={main2}
             className="d-block mx-lg-auto img-fluid" 
            alt="Bootstrap Themes" 
            width="480" 
            height="500" 
            loading="lazy" 
          />
        </div>
        <div className="col-lg-6 ">
          <h1 className="text-2xl fw-semibold      text-gray-800 lh-1   mb-3">
          Seamless GST Invoicing, E-invoicing, and E-way Bills Creation

          </h1>
          <p className="lead  text-gray-600  text-xl font-semibold ">
          Easily comply with government regulations and create customizable & fully compliant GST invoices, e-invoices, e-way bills, quotations, and other essential documents via GST Accounting Software. You can directly send them over WhatsApp or email and track when your clients view your invoice. Easily send automated reminders to collect payments on time.

</p>
          <div className="d-grid gap-2 d-md-flex mt-3 justify-content-md-start">
            <button type="button" onClick={handlecheck} style={{backgroundColor:"#1f506c"}} className="btn    border-b-4 btn-lg px-4 text-white me-md-2">Get Started</button>
            </div>
        </div>
      </div>
    </div>

<div className="container col-xxl-8 px-4  py-6 ">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-3">
        <div className="col-10 mx-auto col-sm-8 col-lg-6">
          <img 
             src={main3}
             className="d-block mx-lg-auto img-fluid" 
            alt="Bootstrap Themes" 
            width="480" 
            height="500" 
            loading="lazy" 
          />
        </div>
        <div className="col-lg-6 ">
          <h1 className="text-2xl fw-semibold      text-gray-800 lh-1   mb-3">
          Simplified GST Accounting
          </h1>
          <p className="lead  text-gray-600  text-xl font-semibold ">
          Automatically generate journal & voucher entries, balance sheets, trial balance reports, P&L statements, GSTR reports, and other important financial reports with Refrens GST Accounting Software.
</p>
          <div className="d-grid gap-2 d-md-flex mt-3 justify-content-md-start">
            <button type="button" style={{backgroundColor:"#1f506c"}}  onClick={handlecheck} className="btn    border-b-4 btn-lg px-4 text-white me-md-2">Get Started</button>
            </div>
        </div>
      </div>
    </div>
<div className="container col-xxl-8 px-4  py-6 ">
      <div className="row flex-lg-row align-items-center g-5 py-3">
        <div className="col-10 mx-auto col-sm-8 col-lg-6">
          <img 
             src={main4}
             className="d-block mx-lg-auto img-fluid" 
            alt="Bootstrap Themes" 
            width="480" 
            height="500" 
            loading="lazy" 
          />
        </div>
        <div className="col-lg-6 ">
          <h1 className="text-2xl fw-semibold      text-gray-800 lh-1   mb-3">
          Robust Financial Reporting
          </h1>
          <p className="lead  text-gray-600  text-xl font-semibold ">
          Generate all types of financial reports including accounts payable/receivable reports, GSTR filing reports, Client Reports, Vendor reports, Balance Sheets, P&L statements, Product/project-wise profitability reports, and more. with Refrens GST Accounting Software.

</p>
          <div className="d-grid gap-2 d-md-flex mt-3 justify-content-md-start">
            <button type="button" style={{backgroundColor:"#1f506c"}}   onClick={handlecheck} className="btn    border-b-4 btn-lg px-4 text-white me-md-2">Get Started</button>
            </div>
        </div>
      </div>
    </div>









    <div className="px-4 pt-5 my-5 text-center border-bottom">
      <h1 className="display-5 fw-bold text-body-emphasis">Ensure 100% GST Compliance
</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
        Ensure compliance with all GST guidelines. Generate E-way Bills, E-invoices, GSTR reports, TDS reports, and more with ease on Refrens GST Accounting Software.        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-center mb-5">
           <button type="button" className="btn btn-outline-secondary w-64 border-b-2 btn-lg px-4">Get Started</button>
        </div>
      </div>
      <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
        <div className="container flex justify-center px-5">
          <img 
            src={main3} 
            className="img-fluid border rounded-3 shadow-lg mb-4" 
            alt="Example image" 
            width="700" 
            height="500" 
            loading="lazy" 
          />
        </div>
      </div>
    </div>




<Feature></Feature>
<Footer></Footer>

    </div>
  )
}
  
export default Home
