import ButtonGradient from "./assets/svg/ButtonGradient";
import VehicleGallery from "./Screens/VehicleGallery";


import Login from './Screens/Login.jsx';
import { CartProvider } from './components/ContextReducer';
import Home from './Screens/Home.jsx';
import Signup from './Screens/Signup.jsx';
import Aboutus from './Screens/Aboutus.jsx';
import Contactus from './Screens/Contactus';
import MyOrder from './Screens/MyOrder.jsx';
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddVechicle from "./Screens/AddVehicle";
import YourVehicles from "./Screens/YourVehicles";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



const App = () => {
  return (
    <CartProvider>
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
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>

  );
};



export default App;