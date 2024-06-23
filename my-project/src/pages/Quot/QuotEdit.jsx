import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const QuotEdit = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  console.log(user);
  const navigate = useNavigate();

  const [userinfo, setUser] = useState([]);
axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.post(`https://invoicerly-server.vercel.app/check`, { email })
      .then(result => {
        setUser(result.data.data);
      })
      .catch(err => {
        console.error('Error fetching invoice data:', err);
      });
  }, [email]);

  const [srNo, setSrNo] = useState(generateSrNo());
  const [date, setDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [billedToCompanyName, setBilledToCompanyName] = useState("");
  const [address, setBilledToOwnerName] = useState("");

  const [items, setItems] = useState([
    { itemName: "", price: 0, gstPercentage: 0, quantity: 0, total: 0 },
    { itemName: "", price: 0, gstPercentage: 0, quantity: 0, total: 0 },
    { itemName: "", price: 0, gstPercentage: 0, quantity: 0, total: 0 },
    { itemName: "", price: 0, gstPercentage: 0, quantity: 0, total: 0 },
  ]);

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === "price" || field === "gstPercentage" || field === "quantity") {
      const price = parseFloat(newItems[index].price) || 0;
      const gstPercentage = parseFloat(newItems[index].gstPercentage) || 0;
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const gstAmount = (price * gstPercentage) / 100;
      const total = (price + gstAmount) * quantity;

      newItems[index].total = total.toFixed(2);
    }

    setItems(newItems);
  };

  function generateSrNo() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
axios.defaults.withCredentials = true;

    if (!srNo || !date || !lastDate || !billedToCompanyName || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    axios.post(`https://invoicerly-server.vercel.app/quotation`, {
      email,
      srNo,
      date,
      lastDate,
      billedToCompanyName,
      address,
      items,
      subtotal: calculateSubtotal(),
      gst: calculateGST(),
      total: calculateTotal()
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }).then(result => {
      console.log(result);
      navigate(`/dash/quotation/quotprint/${result.data._id}`);
    }).catch(err => console.log(err));
  };

  const calculateGST = () => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseFloat(item.quantity);
      const gstPercentage = parseFloat(item.gstPercentage);
      const gstAmount = (price * gstPercentage) / 100;
      return acc + gstAmount * quantity;
    }, 0);
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => {
      return acc + parseFloat(item.price) * parseFloat(item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  return (
    <div className="d-flex">
      <div className="fixed-sidebar    ml-72">
      </div>
      <div className="content-area w-full px-5 scrol">
        <h1 className="display-6 fw-semibold py-3 text-gray-700 lh-1 mb-3">
          Create Quotation:-
        </h1>
        <div className="row row-cols-1 row-cols-md-3 mb-3">
          <div
            className="p-5 bg-white"
            style={{ width: "892.5px", height: "1313px" }}
          >
            <h1 className="text-4xl fw-semibold underline text-center text-gray-800 lh-1 mb-3">
              Quotation
            </h1>
            <div className="pt-4 pb-6">
              <form onSubmit={handleSubmit}>

              <div className="flex ">
              <div className="   w-8/12">

                <div className="row w-8/12  mb-3">
                  <label className="col-sm-3 font-semibold col-form-label">Quot. ID *</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control bg-white border-b-2"
                      id="srNo"
                      placeholder="Sr. no."
                      value={srNo}
                      required // Add the required attribute
                      readOnly
                       onChange={(e) => setSrNo(e.target.value)}
                     />
                  </div>
                </div>
                <div className="row w-8/12  mb-3">
                  <label className="col-sm-3 font-semibold col-form-label">Issued Date *</label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control border-b-2"
                      id="date"
                      value={date}
                      required // Add the required attribute

                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row w-8/12  mb-3">
                  <label className="col-sm-3 font-semibold col-form-label">Valid till *</label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      className="form-control border-b-2"
                      id="lastDate"
                      value={lastDate}
                      required // Add the required attribute

                      onChange={(e) => setLastDate(e.target.value)}
                    />
                  </div>
                </div>
                </div>
                <div><img src={userinfo.logo} alt=""  width={"200px"}/></div>
                </div>




                <div className="flex gap-3 mb-8 justify-center flex-row">
                  <div className="w-6/12 h-44 px-2 border-2">
                    <h1 className="display-7 fw-semibold py-3 underline text-gray-700 lh-1 mb-3">
                      Billed by:-
                    </h1>
                    <p className="text-gray-700 font-semibold pb-3">Company Name: {userinfo.company}</p>
                    <p className="text-gray-700 font-semibold">Owner Name: {userinfo.name}</p>
                  </div>
                  <div className="w-6/12 px-2 h-44 border-2">
                    <h1 className="display-7 fw-semibold py-3 underline text-gray-700 lh-1 mb-3">
                      Billed to:-
                    </h1>
                    <div className="row mb-1">
                      <label className="col-sm-5 col-form-label"> Bussiness Name *</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control border-b-2"
                          id="billedToCompanyName"
                          placeholder="Name"
                          value={billedToCompanyName}
                          required // Add the required attribute

                          onChange={(e) => setBilledToCompanyName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-0">
                      <label className="col-sm-5 col-form-label">Address *</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className="form-control border-b-2"
                          id="billedToOwnerName"
                          placeholder="Address"
                          value={address}
                          required // Add the required attribute

                          onChange={(e) => setBilledToOwnerName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="flex gap-4 mt-8">
                  <div className="w-4/12 border-2 h-10 flex pt-1 font-bold justify-center border-slate-200 text-gray-400">
                    <div className="form-check">
                      <label className="form-check-label">
                        GST
                      </label>
                    </div>
                  </div>
                  <div className="w-4/12 border-2 h-10 flex pt-1 font-bold justify-center border-slate-200 text-gray-400">
                    Currency= Rupee[₹]
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl font-semibold underline text-gray-800 mb-3">Item Details:-</h2>

                  <div className="flex gap-1 text-2xl text-gray-800 font-semibold pl-3">
                    <div className="w-3/12">Products</div>
                    <div className="w-2/12">Price</div>
                    <div className="w-2/12">GST%</div>
                    <div className="w-2/12">Quantity</div>
                    <div className="w-2/12">Sub-Total</div>
                  </div>
                  <hr />

                  <div className="pt-2 text-gray-600">
                    {items.map((item, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-sm-3 flex">
                          <div className="text-3xl">{index + 1}.</div>
                          <input
                            type="text"
                            className="form-control border-b-2"
                            placeholder="Item Name"
                            value={item.itemName}
                            onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
                          />
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="number"
                            className="form-control border-b-2"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => handleInputChange(index, "price", e.target.value)}
                          />
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="number"
                            className="form-control border-b-2"
                            placeholder="GST %"
                            value={item.gstPercentage}
                            onChange={(e) => handleInputChange(index, "gstPercentage", e.target.value)}
                          />
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="number"
                            className="form-control border-b-2"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                          />
                        </div>
                        <div className="col-sm-3 ">
                          <input
                            type="number"
                            className="form-control border-b-2"
                            placeholder="Total"
                            value={item.total}
                            readOnly
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex pt-6">
                      <div className="w-7/12"></div>
                      <div className="w-5/12  pt-3 ">
                        <div className="flex pb-3  justify-between"><div>Ammount </div> <div className="font-bold">₹ {calculateSubtotal()}</div></div>
                        <div className="flex pb-3 justify-between"><div>GST </div> <div className="font-bold">₹ {calculateGST()}</div></div>
                        <hr />
                        <div className="flex pb-2 text-xl justify-between pt-2"><div className="   font-bold">Total(INR) </div> <div className="font-bold">₹ {calculateTotal()}</div></div>
                      </div>
                    </div>
                     <div className="flex pt-8 justify-center">  
     
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn text-2xl   w-96 mr-8 mx-auto font-semibold w-3/12 mt-14   "
                      style={{ border: "2px solid #1f506c", color: "#1f506c" }}
                    >
                      Submit Invoice
                    </button>
                     </div>
                  </div>
                </div>
              </form>
            </div>

            
          </div>
   
        </div>
      </div>
    </div>
  );
};

export default QuotEdit;
