import ButtonGradient from "./assets/svg/ButtonGradient";
import VehicleGallery from "./Component_Stack/Pages/VehicleGallery"; 
import Login from './Component_Stack/User_Authentication/Login';
import Signup from './Component_Stack/User_Authentication/Signup.jsx';
import Home from './Component_Stack/Pages/Home';
import Aboutus from './Component_Stack/Pages/Aboutus.jsx';
import Contactus from './Component_Stack/Pages/Contactus';
import MyOrder from './Component_Stack/Pages/MyOrder.jsx';
import Footer from "./Component_Stack/Sections/Footer";
import Header from "./Component_Stack/Sections/Header";
import AddVechicle from "./Component_Stack/Pages/AddVehicle";
import YourVehicles from "./Component_Stack/Pages/YourVehicles";
import {AuthenticationContextProvider} from "./Context/Authentication.jsx";

import { CartProvider } from './components/ContextReducer';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MyCart from "./Component_Stack/Pages/MyCart.jsx";



const App = () => {
  // const [theme, setTheme] = useState('light');

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <CartProvider>
    <ToastContainer autoClose={1500} />
      <div className="flex flex-col min-h-screen justify-between">
        <ButtonGradient />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/aboutus' element={<Aboutus />} />
            <Route exact path='/contactus' element={<Contactus />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/myorder' element={<MyOrder />} />
            <Route exact path='/rentnow' element={<VehicleGallery />} />
            <Route exact path='/addvehicle' element={<AddVechicle />} />
            <Route exact path='/yourvehicles' element={<YourVehicles />} />
            <Route exact path='/mycart' element={<MyCart />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
    </GoogleOAuthProvider>
  );
};



export default App;