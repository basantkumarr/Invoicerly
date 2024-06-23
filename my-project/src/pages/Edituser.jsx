import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    company: '',
    logo: '',
    address: '',
    accountNumber: '',
    city: '',
    mobile: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(response => {
        console.log('Fetched user data:', response.data); // Log the fetched data
        setUserData(response.data); // Assuming response.data is the user object
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updating user with data:', userData); // Log the data being sent for update

    axios.put(`http://localhost:3001/users/${id}`, userData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then(result => {
        console.log('User update response:', result.data); // Log the update response
        setUserData(result.data); // Assuming result.data is the updated user object
        navigate("/dash/profile");
      })
      .catch(err => {
        console.error('Error updating user data:', err);
      });
  };

  return (
    <div className="d-flex">
     <div className="fixed-sidebar    ml-72">
     </div>
      <div className="content-area w-full px-5 scrol">
        <div className="text-center text-slate-800 py-4 text-3xl font-semibold">
          Admin Panel - Edit User
        </div>

        <form className="row g-3" onSubmit={handleUpdate}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder='Full Name' className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Business/Company Name</label>
            <input type="text" name="company" value={userData.company} onChange={handleInputChange} className="form-control" placeholder="Company Name" />
          </div>
          <div className="col-12">
            <label className="form-label">Business Logo Image Link</label>
            <input
              type="text"
              name="logo"
              className="form-control"
              value={userData.logo}
              onChange={handleInputChange}
              placeholder="https://abcde"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Address"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Account No.</label>
            <input
              type="text"
              name="accountNumber"
              value={userData.accountNumber}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Account Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" name="city" value={userData.city} onChange={handleInputChange} className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Mobile No.</label>
            <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange} className="form-control" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn w-100 btn-dark">UPDATE</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
