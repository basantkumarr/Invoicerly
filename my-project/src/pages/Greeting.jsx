import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useUser } from '@clerk/clerk-react';

const Greeting = () => {
  const componentRef = useRef();
  const [img, setImg] = useState('');
  const [userinfo, setUserinfo] = useState({});
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
axios.defaults.withCredentials = true;

  useEffect(() => {
    if (email) {
      axios.post('https://invoicerly-server.vercel.app/check', { email })
        .then(result => {
          setUserinfo(result.data.data);
        })
        .catch(err => {
          console.error('Error checking user:', err);
        });
    }
  }, [email]);

  const handleDownloadPDF = () => {
    const input = componentRef.current;

    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Greeting.pdf');
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  };

  const handleImageChange = (e) => {
    setImg(e.target.value);
  };

  return (
    <div>
      <div className="d-flex">
        <div className="fixed-sidebar ml-72"></div>
        <div className="content-area w-full px-5 scroll">
          <h1 className="display-6 fw-semibold py-3 text-gray-700 lh-1 mb-3">
            Add greeting Image link:
          </h1>
          <input
            type="text"
            className="form-control w-8/12 m-4"
            id="floatingInput"
            onChange={handleImageChange}
            placeholder="Add image link"
          />
          <div className="row row-cols-1 row-cols-md-3 mb-3">
            <div
              ref={componentRef}
              className="motech p-5 shadow-lg bg-white"
              style={{
                width: "892.5px",
                height: "913px",
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              <div className="flex text-white justify-between text-4xl font-semibold">
                <div>By {userinfo.name}</div>
                <div>From {userinfo.company}</div>
              </div>
              <div style={{ marginTop: "720px", marginLeft: "730px" }}>
                <img src={userinfo.logo} width="70px" alt="Company Logo" />
              </div>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="btn text-2xl mt-4 text-light" style={{ backgroundColor: "#1f506c" }}>
                  Print
                </button>
              )}
              content={() => componentRef.current}
            />
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
