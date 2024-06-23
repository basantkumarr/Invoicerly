import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
 import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

 import { useUser } from '@clerk/clerk-react';
 

const Invcreate = () => {
  const component = useRef();
  const { id } = useParams();  // This line should work if useParams is correctly imported
  const [invoice, setInvoice] = useState(null);


  const [userinfo, setUser] = useState([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
axios.defaults.withCredentials = true;

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


  useEffect(() => {
    axios.get(`https://invoicerly-server.vercel.app/invoices/${id}`)
      .then(response => {
        setInvoice(response.data);
      })
      .catch(err => {
        console.error('Error fetching invoice data:', err);
      });
  }, [id]);

  const handleDownloadPDF = () => {
    const input = component.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice${invoice.srNo}.pdf`);
      });
  };


  if (!invoice) {
    return <div>Loading...</div>;
  }




  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString('en-US');
  };

  return (
    <div className="d-flex">
     <div className="fixed-sidebar    ml-72">
     </div>
      <div className="content-area w-full px-5 scrol">
        <h1 className="display-6 fw-semibold py-3 text-gray-700 lh-1 mb-3">
          Invoice Details:-
        </h1>
        <div className="row row-cols-1 row-cols-md-3 mb-3">
          <div
            ref={component}
            className="motech p-5 bg-white"
            style={{ width: "892.5px", height: "1313px" }}
          >
        
            <h1 className="text-4xl fw-semibold underline text-center text-gray-800 lh-1 mb-3">
              Invoice
            </h1>
            <div className="pt-8  pb-6">
            <div className="flex ">
            <div className="   w-8/12">


                 <div className="row w-8/12  mb-3">
                  <label className="col-sm-4 font-semibold text-xl  text-gray-700 col-form-label">Inv. Id</label>
                  <div className="col-sm-8 text-xl  text-gray-600 font-bold  pt-1">
                  {invoice.srNo}
                     
                  </div>
                </div>
                <div className="row w-8/12  mb-3">
                  <label className="col-sm-4 font-semibold text-xl  text-gray-700 col-form-label"> Invoice date </label>
                  <div className="col-sm-8 text-xl  text-gray-600 font-bold  pt-1">
                  {formatDate(invoice.date)}
                   
                  </div>
                </div>
                <div className="row w-8/12  mb-3">
                  <label className="col-sm-4 font-semibold text-xl  text-gray-700 col-form-label">Due date </label>
                  <div className="col-sm-8 text-xl  text-gray-600   font-bold pt-1">
                  {formatDate(invoice.lastDate)}                   
                  </div>
                </div>
                </div>
                <div><img src={userinfo.logo} alt=""  width={"200px"}/></div>
                </div>
                <div className="flex gap-3 mb-8 justify-center  mt-10 flex-row">
                  <div className="w-6/12 h-44 px-2  border-slate-300 border-2">
                    <h1 className="display-7 fw-semibold py-3 underline text-gray-700 lh-1 mb-3">
                      Billed by:-
                    </h1>
                    <p className="text-gray-700 font-semibold pb-1">Company Name: SkyNet</p>
                    <p className="text-gray-700 font-semibold pb-1">Owner Name: India</p>
                    <p className="text-gray-700 font-semibold">Mobile no: 9879789733</p>
                  </div>
                  <div className="w-6/12 px-2 h-44 border-slate-300 border-2">
                    <h1 className="display-7 fw-semibold py-3 underline text-gray-700 lh-1 mb-3">
                      Billed to:-
                    </h1>
                    <div className="row mb-1">
                      <label className="col-sm-5 col-form-label">Name </label>
                      <div className="col-sm-7 pt-1">
                       : {invoice.billedToCompanyName}
                      
                      </div>
                    </div>
                    <div className="row mb-0">
                      <label className="col-sm-5 col-form-label">Address </label>
                      <div className="col-sm-7 pt-1 ">
                       :{invoice.address}
                      
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="flex gap-4 mt-8">
                  <div className="w-4/12 border-2 h-10 flex pt-1 font-bold justify-center border-slate-300 text-gray-400">
                    <div className="form-check">
                      <label className="form-check-label">
                        GST
                      </label>
                    </div>
                  </div>
                  <div className="w-4/12 border-2 h-10 flex pt-1 font-bold justify-center border-slate-300 text-gray-400">
                    Currency= Rupee[₹]
                  </div>
                </div>

                <div className="mt-4 ">
                  <h2 className="text-2xl font-semibold underline text-gray-700 mb-3">Item Details:-</h2>

                  <div className="flex gap-1 text-2xl  py-2    bg-slate-300 text-gray-800 font-semibold pl-3 " style={{borderTopLeftRadius:"7px", borderTopRightRadius:"7px"}}>
                    <div className=" w-60">Products</div>
                    <div className="w-2/12">Price</div>
                    <div className="w-2/12">GST%</div>
                    <div className="w-2/12">Quantity</div>
                    <div className="w-2/12">Sub-Total</div>
                  </div>
                   <div className="pt-2 text-gray-600">
                    {invoice.items.map((item, index) => (
                      <div className="row mb-3 mx-1" key={index}>
                        <div className="col-sm-4 mb-2 text-2xl flex">
                          <div className=" pr-2 ">{index + 1}.</div>
                         { item.itemName}
                            
                        </div>
                        <div className="col-sm-2">
                          
                            { item.price}
                           
                        </div>
                        <div className="col-sm-2">
                        { item.gstPercentage}
                        
                        </div>
                        <div className="col-sm-2">
                       
                         { item.quantity}
                           
                        </div>
                      
                           {item.total}
                           <hr />
                        </div>
                        
                     ))}
                     <div className="flex pt-6">
                      <div className="w-6/12"></div>
                      <div className="w-6/12  pt-7 ">
                        <div className="flex pb-3  justify-between"><div>Ammount </div> <div className="font-bold">₹  {invoice.subtotal}</div></div>
                        <div className="flex pb-3 justify-between"><div>GST </div> <div className="font-bold">₹ {invoice.gst}</div></div>
                        <hr />
                        <div className="flex pb-2 text-xl justify-between pt-2"><div className="   font-bold">Total(INR) </div> <div className="font-bold">₹ {invoice.total}</div></div>
                      </div>
                    </div>
                     <div className="flex pt-8 justify-center">  
     
                  
                     </div>
                  </div>
                </div>
             </div>

            




            <div className="  w-full  flex justify-center font-semibold align-middle pt-3 gap-5   h-14 bg-slate-300" style={{borderRadius:"9px"}}>
              <div >EmailId: {invoice.emid}</div>
              <div> UPI Id: 213131232</div>
              <div> Account no :HDFC2324324JF2</div>
            </div>
           </div>
           
          <ReactToPrint
            trigger={() => (
              <button
                className="btn text-2xl mt-4 text-light"
                style={{ backgroundColor: "#1f506c" }}
              >
                Print
              </button>
            )}
            content={() => component.current}
          />
          <button
            className="btn text-2xl mt-4 ml-2"
            style={{ border: "2px solid #1f506c", color: "#1f506c" }}
            onClick={handleDownloadPDF}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invcreate;
