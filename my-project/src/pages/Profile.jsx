import   { useEffect, useState } from 'react';
 import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userinfo, setUser] = useState({});
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
    <div className="d-flex ">
     <div className="fixed-sidebar    ml-72">
     </div>
      <div className="content-area mb-9 py-auto h-auto w-full  px-5 scrol">
         <div className='pt-9' style={styles.profileContainer}>
          <form style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name:</label>
              <span style={styles.value}>{userinfo.name}</span>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Business/Company Name:</label>
              <span style={styles.value}>{userinfo.company}</span>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Business Logo Image Link:</label>
              <span    style={styles.value }>{userinfo.logo}</span>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Address:</label>
              <span style={styles.value}>{userinfo.address}</span>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Account No.:</label>
              <span style={styles.value}>{userinfo.accountNumber}</span>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>City:</label>
              <span style={styles.value}>{userinfo.city}</span>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mobile No.:</label>
              <span style={styles.value}>{userinfo.mobile}</span>
            </div>
            <Link to={`/dash/edituser/${userinfo._id}`}>
  <button style={styles.button} type="button mb-9">Edit Data</button>
</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginTop: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '800px',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    flex: '0 0 45%',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    flex: '1',
    fontSize: '1rem',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    marginBottom:"20px",
  },
};

export default Profile;
