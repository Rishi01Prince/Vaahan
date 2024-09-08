import { useLocation, Link, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";  

import logo from "../assets/vahanlogo.png";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import Modal from '../Modal';
import Cart from '../Screens/Cart';

import { useCart } from './ContextReducer';

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);

  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName"); 
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

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" to="/">
          <img src={logo} width={100} height={40} alt="logo" />
        </Link>

        {/* {userName && (
          <span className="ml-4 text-lg font-semibold text-n-1">
            Welcome, {userName}
          </span>
        )} */}

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${pathname.hash === "#section1" ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/"
            >
              Home
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${pathname.hash === "#section2" ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/rentnow"
            >
              Rent Now
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${pathname.hash === "#section2" ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/aboutus"
            >
              About Us
            </Link>

            <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${pathname.hash === "#section2" ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/contactus"
            >
              Contact Us
            </Link>
          </div>

          <HamburgerMenu />
        </nav>

        {/* Display Login/Signup or Logout/Cart based on authentication status */}
        {(!localStorage.getItem("authToken")) ? (
          <div className="flex items-center space-x-4">
            
            <Link
              to="/signup"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </Link>
            <Button className="hidden lg:flex">
              <Link to="/login">
                Sign in
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
          <Link
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${pathname.hash === "#section2" ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              to="/yourvehicles"
            >
              Your Vehicles
            </Link>
            <Button className="hidden lg:flex">
              <Link to="/myorder">
                My Orders
              </Link>
            </Button>
            <Button className="hidden lg:flex" onClick={() => setCartView(true)}>
              <ShoppingCart size={18} className="mr-1" />
              <span className="ml-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {data !== undefined && data.length > 0 ? data.length : 0}
              </span>
            </Button>
            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
            <Button className="hidden lg:flex" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
