import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const [userinfo, setUser] = useState([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    axios
      .post("https://invoicerly-server.vercel.app/check", { email })
      .then((result) => {
        setUser(result.data.data);
      })
      .catch((err) => {
        console.error("Error fetching invoice data:", err);
      });
  }, [email]);

  return (
    <div className="flex">
      <div className="sidebar fixed shadow-md">
        <div  className="flex flex-col justify-between p-4 bg-gray-100  h-screen  "  style={{     height: '90vh',   }}  >
          <div>
            <Link to="/dash">
              <a
                href="/"
                className="flex items-center mb-6 text-gray-800 no-underline"
              >
                <div className="logo-container">
                  <img src={userinfo.logo} alt="" />
                </div>
                <span className="sidebar-title text-2xl font-semibold">
                  {userinfo.company}
                </span>
              </a>
            </Link>
            <hr />
            <hr className="mb-4" />
            <ul className="nav flex-col gap-3">
              <Link to="/dash">
                <li className="nav-item">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-lg text-gray-800 hover:text-blue-900 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="20"
                      fill="currentColor"
                      className="bi mt-2 bi-menu-button-wide-fill"
                    >
                      <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                    </svg>
                    <span className="sidebar-title"> Dashboard</span>
                  </a>
                </li>
              </Link>
              <Link to="/dash/profile">
                <li className="nav-item">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-lg text-gray-800 hover:text-blue-900 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
                      fill="currentColor"
                      className="bi mt-2 bi-person-square"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    </svg>
                    <span className="sidebar-title"> Profile</span>
                  </a>
                </li>
              </Link>
              <Link to="/dash/invoice">
                <li className="nav-item">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-lg text-gray-800 hover:text-blue-900 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
                      fill="currentColor"
                      className="bi mt-2 bi-receipt-cutoff"
                    >
                      <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5M11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                      <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1.5 2v14a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.801-.13L13 1.793 11.854.646a.5.5 0 0 0-.708 0L10 1.793 8.854.646a.5.5 0 0 0-.708 0L7 1.793 5.854.646a.5.5 0 0 0-.708 0L4 1.793 2.854.646a.5.5 0 0 0-.708 0L1 1.793.146.646a.5.5 0 0 0-.792.135zM1 2.618V15.5l.276-.138a1.5 1.5 0 0 1 1.344 0l.724.362a1.5 1.5 0 0 0 1.344 0l.724-.362a1.5 1.5 0 0 1 1.344 0l.724.362a1.5 1.5 0 0 0 1.344 0l.724-.362a1.5 1.5 0 0 1 1.344 0l.724.362a1.5 1.5 0 0 0 1.344 0l.276-.138V2.618l.276-.138a.5.5 0 0 1 .552.09L15 2.618v13.764a.5.5 0 0 1-.276.138l-.724.362a.5.5 0 0 0-.448 0l-.724.362a.5.5 0 0 1-.448 0l-.724-.362a.5.5 0 0 0-.448 0l-.724.362a.5.5 0 0 1-.448 0l-.724-.362a.5.5 0 0 0-.448 0l-.724.362a.5.5 0 0 1-.448 0l-.724-.362a.5.5 0 0 0-.448 0l-.724.362a.5.5 0 0 1-.448 0L1 16.382V2.618zm13-.138a.5.5 0 0 0-.552-.09L13 2.618v13.764l.276-.138a.5.5 0 0 1 .552.09z" />
                    </svg>
                    <span className="sidebar-title"> Invoices </span>
                  </a>
                </li>
              </Link>
              <Link to="/dash/quotation">
                <li className="nav-item">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-lg text-gray-800 hover:text-blue-900 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
                      fill="currentColor"
                      className="bi  mt-2 bi-aspect-ratio"
                    >
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                      <path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z" />
                    </svg>
                    
                    <span className="sidebar-title"> Quotation</span>
                    </a>
                </li>
              </Link>

              <Link to="/dash/greet">
                <li className="nav-item">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-lg text-gray-800 hover:text-blue-900 transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
                      fill="currentColor"
                      className="bi  mt-2 bi-cash-coin"
                    >
                      <path d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                      <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                      <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                      <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                    </svg>
                     <span className="sidebar-title"> Greetings</span>

                  </a>
                </li>
              </Link>
            </ul>
          </div>
          <div className="dropdown  sidebar-title">
            <hr />
            <a
              href="#"
              className="flex items-center pt-2 text-gray-800 no-underline dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={userinfo.logo}
                alt=""
                width="42"
                height="42"
                className="rounded-full mr-3"
              />
              <span className="text-2xl ">{userinfo.company}</span>
            </a>
            <ul className="dropdown-menu text-sm shadow">
              <Link to="/dash/profile">
                {" "}
                <li>
                  <a className="dropdown-item" href="/">
                    Edit Profile
                  </a>
                </li>{" "}
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <Link to="/dash">
                {" "}
                <li>
                  <a className="dropdown-item" href="#">
                    Go to Dasboard
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
