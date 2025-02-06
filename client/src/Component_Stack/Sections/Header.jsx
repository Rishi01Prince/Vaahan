import { useLocation, Link, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState , useContext } from "react";
import { ShoppingCart } from "lucide-react";

import logo from "../../assets/vahanlogo.png";
import Button from "../../components/Button";
import MenuSvg from "../../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import Modal from '../../Modal';
import { useCart } from '../../components/ContextReducer';
import Cookies from "js-cookie";
import { googleLogout } from '@react-oauth/google';




const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
 
  let data = useCart();
  
  

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profilePic");
    Cookies.remove("authToken");
    
    navigate("/login");
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  // Close the navigation menu after clicking a link
  const closeMenuOnLinkClick = () => {
    setOpenNavigation(false);
    enablePageScroll();
  };

  return (
    <div
      className={`mb-2 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
       
        <Link className="block w-[12rem] xl:mr-8" to="/">
          <img src={(!localStorage.getItem("profilePic") | localStorage.getItem("profilePic") == '' )? logo : localStorage.getItem("profilePic")} width={65} height={20} alt="logo" className="rounded-full" />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                pathname.hash === "#section1"
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/"
              onClick={closeMenuOnLinkClick} 
            >
              Home
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                pathname.hash === "#section2"
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/rentnow"
              onClick={closeMenuOnLinkClick} 
            >
              Rent Now
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                pathname.hash === "#section2"
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/yourvehicles"
              onClick={closeMenuOnLinkClick} 
            >
              Your Vehicles
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                pathname.hash === "#section2"
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/aboutus"
              onClick={closeMenuOnLinkClick} 
            >
              About Us
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                pathname.hash === "#section2"
                  ? "z-2 lg:text-n-1"
                  : "lg:text-n-1/50"
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/contactus"
              onClick={closeMenuOnLinkClick} // Close menu on click
            >
              Contact Us
            </Link>

            {/* Authentication Section for Mobile View */}
            {(!Cookies.get("authToken")) ? (
              <div className="flex flex-col items-center space-y-4 lg:hidden">
                <Button onClick={closeMenuOnLinkClick}>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button onClick={closeMenuOnLinkClick}>
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 lg:hidden">
                <Button onClick={closeMenuOnLinkClick}>
                  <Link to="/myorder">My Orders</Link>
                </Button>
                <Button onClick={() => { setCartView(true); closeMenuOnLinkClick(); }}>
                  <ShoppingCart size={18} className="mr-1" />
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {data !== undefined && data.length > 0 ? data.length : 0}
                  </span>
                </Button>
                
                <Button onClick={() => { handleLogout(); closeMenuOnLinkClick(); }}>Logout</Button>
              </div>
            )}
          </div>

          <HamburgerMenu />
        </nav>

        {(!Cookies.get("authToken")) ? (
          <div className="hidden lg:flex items-center space-x-4">
            <Button>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-4">
            <Button>
              <Link to="/myorder">My Orders</Link>
            </Button>
            <Button onClick={() => setCartView(true)}>
            <Link to="/mycart">
              <ShoppingCart size={18} className="mr-1" />
              <span className="ml-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {data !== undefined && data.length > 0 ? data.length : 0}
              </span>
              </Link>
            </Button>
           
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}

        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
