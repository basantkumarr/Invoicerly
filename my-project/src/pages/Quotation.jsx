import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';

import img from '../assets/Quotimg.png'

const Quotation = () => {
  const [invs, setInv] = useState([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (email) {
      axios.post('http://localhost:3001/quotdata', { email })
        .then(response => {
          console.log('Invoice data:', response.data);
          setInv(response.data);
        })
        .catch(error => {
          console.error('Error fetching invoice data:', error);
        });
    }
  }, [email]);
  return (
    <div>
          <div className="d-flex">
    <div className="fixed-sidebar    sidem">
    </div>
      <div className="content-area w-full px-5 scrol">
        <h1 className="display-6 fw-semibold py-3 underline text-gray-700 lh-1 mb-3">
          Quotation
        </h1>
        <div className="flex flex-col">
          <div className="flex h-72 justify-between flex-row">
            <div className="w-7/12 flex justify-center">
     <img src={img} alt="dd" width={"300px"} />            </div>
            <div className="w-4/12">
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 text-xl font-semibold">  Quotation</h4>
                  </div>
                  <div className="card-body">
                    <p className="py-7">
                      Generate professional Quotation quickly and easily for your customers.A document that a seller provides to a buyer to offer.
                    </p>
                    <Link to="/dash/quotation/quotedit">
                      <button
                        type="button"
                        className="w-100 btn btn-lg text-white"
                        style={{ backgroundColor: "#1f506c" }}
                      >
                        Generate Quotation
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl fw-semibold py-3 text-gray-700 lh-1 mb-3">
              All Quotations:-
            </h1>
            {invs.map((inv, index) => (
              <Link key={inv._id} to={`/dash/quotation/quotprint/${inv._id}`}>
                <div className="invoice-card flex flex-col p-4 mb-4 border rounded shadow-sm">
                  <h2 className="text-xl font-bold mb-2">Serial No: {index + 1}</h2>
                  <hr />
                  <div className="flex pt-2">
                    <div className="w-6/12">
                      <p className="mb-1"><strong>Quotation No:</strong> {inv.srNo}</p>
                      <p className="mb-1"><strong>Business Name:</strong> {inv.billedToCompanyName}</p>
                      <p className="mb-1"><strong>Address:</strong> {inv.address}</p>
                    </div>
                    <div className="w-6/12">
                      <p className="mb-1"><strong>Total:</strong> ₹ {inv.total}</p>
                      <p className="mb-1"><strong>GST:</strong> ₹ {inv.gst}</p>
                      <p className="mb-1"><strong>Subtotal:</strong> ₹ {inv.subtotal}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Quotation
