import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "./components/adminLogin";
import ClientLogin from "./components/clientLogin";
import DriverLogin from "./components/driverLogin";
import Signup from './components/signup.js';
import Welcome from "./components/welcome";
import SignupSuccessful from "./components/sign_success";
import Client from "./components/client";
import DriverSignup from "./components/driversign";
import DriverSignupSuccessful from "./components/driver_success";
import RideSuccess from "./components/ride_success";
import DriverDashboard from "./components/driver_dashborad";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/sign_success" element={<SignupSuccessful />} />
        <Route path="/clientsuccess" element={<Client />} />
        <Route path="/driversignup" element ={<DriverSignup />} />
        <Route path="/driver_success" element ={<DriverSignupSuccessful />} />
        <Route path="/ride_success" element ={<RideSuccess />} />
        <Route path="/driver_dashboard" element ={<DriverDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
