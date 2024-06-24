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
      navigate('/');
    });
  };

  return (
    <div className='flex flex-col items-center bg-white justify-center pt-4 min-h-screen'>
      <h1 className="text-5xl font-semibold text-slate-800 underline mb-4">Register / Login</h1>
      <div className='flex justify-center'>
        <form className="w-7/12" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="inputAddress" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="inputAddress"
              placeholder="Ankit.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="inputCompany" className="block text-sm font-medium text-gray-700">Business/Company Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              id="inputCompany"
              placeholder="OverLays"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          
          {/* Add more input fields as necessary */}
          
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700" type="submit">
            Register
          </button>
        </form>
      </div>

      {/* Conditional rendering for SignIn modal */}
      {!email && (
        <div className="fixed   bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SignIn mode="modal" path="/signin" onSignedIn={() => setShowSignInModal(false)} />
             
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
