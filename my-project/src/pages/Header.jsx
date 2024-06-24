import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import img from "../assets/favi.png"


const Header = () => {
  return (
    <div className="sticky z-50  shadow-lg   top-0">
      <nav className="navbar shadow-md navbar-expand-lg  all navbar-dark" style={{ backgroundColor: "#1f506c" }} aria-label="Offcanvas navbar large">
      <div className="container-fluid">
      <Link  to="/"> 
          <a className="navbar-brand flex text-2xl gap-2 align-middle font-bold" href="#">
          <img src={img} width={"33px"} alt="" />
          InVoicerly
          </a></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">InVoicerly</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link  disabled " aria-current="page" href="#">Pricing</a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Invoice Generator</a></li>
                    <li><a className="dropdown-item" href="#">GST Invoice Maker</a></li>
                    <li><a className="dropdown-item" href="#">Purchase Order Template</a></li>
                    <li><a className="dropdown-item" href="#">Quotation Template</a></li>
                    <li><a className="dropdown-item" href="#">Quotation Generator</a></li>
                  </ul>
                </li>
              </ul>
              <div className="d-flex mt-3 justify-center mt-lg-0">
                 <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" redirectUrl="/dash" />
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;
