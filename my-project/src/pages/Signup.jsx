import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser, SignIn } from '@clerk/clerk-react'; // Import SignIn from Clerk

const Signup = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [logo, setLogo] = useState('');
  const [address, setAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`https://invoicerly-server.vercel.app/register`, {
      name,
      company,
      password,
      email,
      logo,
      address,
      accountNumber,
      city,
      mobile,
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((res) => {
      console.log(res);
      navigate('/dash');
    });
  };

  return (
    <div className='flex flex-col items-center bg-white justify-center pt-4'>
      <h1 className="text-5xl font-semibold text-slate-800 underline mb-4">Register</h1>
      <div className='flex justify-center'>
        <form className="row w-7/12 g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control border-b-2"
              id="inputAddress"
              placeholder="Ankit.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Business/Company Name</label>
            <input
              type="text"
              className="form-control border-b-2"
              id="inputAddress"
              placeholder="OverLays"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Business logo link</label>
            <input
              type="text"
              className="form-control border-b-2"
              id="inputAddress"
              placeholder="http://"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Address</label>
            <input
              type="text"
              className="form-control border-b-2"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Account no.</label>
            <input
              type="text"
              className="form-control border-b-2"
              id="inputAddress2"
              placeholder="HDFC0089821988921"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input
              type="text"
              className="form-control border-b-2"
              id="inputCity"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputZip" className="form-label">Mobile no.</label>
            <input
              type="number"
              className="form-control border-b-2"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <button className="w-full btn btn-lg btn-dark" type="submit">
            Register
          </button>
        </form>
      </div>

      {/* Conditional rendering for SignIn modal */}
      {!email && (
      <div className='fixed top-0 left-0 w-full h-full z-50 bg-gray-500 bg-opacity-50'>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <SignIn onSignedIn={() => navigate('/signup')} />
      </div>
    </div>

      )}
    </div>
  );
};

export default Signup;
