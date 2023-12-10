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
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import AdminSignup from "./components/admin_signup";
import Admin from "./components/admin_success";


// CHANGE TOKEN NAMES
function ProtectedRoutes1() {
  
  if (localStorage.getItem("driver_token")) {
    console.log("client token found")
    return <Outlet />;
  } else {
    console.log("client token not found")
    return <Welcome />;
  }
}
function ProtectedRoutes2() {
  if (localStorage.getItem("client_token")) {
    return <Outlet />;
  } else {
    return <Welcome />;
  }
}
function ProtectedRoutes3() {
  if (localStorage.getItem("admin_token")) {
    console.log("admin token found")
    return <Outlet />;
  } else {
    console.log("admin token not found")
    return <Welcome />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/driversignup" element={<DriverSignup />} />
        {/* make a componet of route */}
        <Route element={<ProtectedRoutes2 />}>
          <Route path="/sign_success" element={<SignupSuccessful />} />
        </Route>
        <Route element={<ProtectedRoutes2 />}>
          <Route path="/clientsuccess" element={<Client />} />
        </Route>
        <Route element={<ProtectedRoutes1 />}>
          <Route path="/driver_success" element={<DriverSignupSuccessful />} />
        </Route>
        <Route element={<ProtectedRoutes2 />}>
          <Route path="/ride_success" element={<RideSuccess />} />
        </Route>
        <Route element={<ProtectedRoutes1 />}>
        <Route path="/driver_dashboard" element={<DriverDashboard />} />
        </Route>

        <Route element={<ProtectedRoutes3 />}>
          <Route path="/admin_success" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
