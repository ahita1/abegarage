import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./assets/css/responsive.css";
import "./assets/css/bootstrap.css";
import "./assets/css/color.css";
import "./assets/css/flaticon.css";
import About from "./Markup/Pages/About";

import { Route, Routes } from "react-router-dom";
import Login from "./Markup/Pages/Login";
import Contact from "./Markup/Pages/Contact";
import Home from "./Markup/Pages/Home";
import Header from "./Markup/Components/Header/Header";
import Footer from "./Markup/Components/Footer/Footer";
import Services from "./Markup/Pages/Services";
import Employees from "./Markup/Pages/Admin/Employees";
import AdminDashBoard from "./Markup/Pages/Admin/AdminDashBoard";
import ServiceManager from "./Markup/Pages/Admin/ServiceManager";
import AddVehicle from "./Markup/Pages/Admin/AddVehicle";
import FirstPage from "./Markup/Pages/Order/FirstPage";
import SecondPage from "./Markup/Pages/Order/SecondPage";
import AddCustomerPage from "./Markup/Pages/Admin/AddCustomerPage";
import AddEmployee from "./Markup/Pages/Admin/AddEmployee";
import EmployeEdit from "./Markup/Pages/Admin/EmployeEdit";
import CustomerEdit from "./Markup/Pages/Admin/CustomerEdit";
import Customers from "./Markup/Pages/Admin/Customers";
import CustomerProfile from "./Markup/Pages/Admin/CustomerProfile";
import FouroFour from "./Markup/Pages/FouroFour";
import Unauthorized from "./Markup/Pages/Unauthorized";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import ThirdPage from "./Markup/Pages/Order/ThirdPage";
import FourthPage from "./Markup/Pages/Order/FourthPage";
import Detail from "./Markup/Components/Order/Detail";

// import VehicleListForm from "./Markup/Components/Admin/VehicleListForm/VehicleListForm";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Services />} />
        <Route path="/admin/third-order" element={<ThirdPage />} />
        <Route path="/admin/fourth-order" element={<FourthPage />} />
        {/* <Route path="/admin" element={<AdminDashBoard />} /> */}

        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AdminDashBoard />
            </PrivateAuthRoute>
          }
        />

        <Route path="admin/service-provide" element={<ServiceManager />} />
        <Route path="admin/add-vehicle" element={<AddVehicle />} />
        <Route path="admin/first-order" element={<FirstPage />} />
        <Route path="admin/second-order" element={<SecondPage />} />
        {/* <Route path="/vehicle" element={<Vehicle/ListForm />} /> */}
        {/* <Route path="admin/add-customer" element={<AddCustomerPage />} /> */}

        <Route
          path="admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddCustomerPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/edit-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EmployeEdit />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/edit-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <CustomerEdit />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/customer-profile"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="admin/detail" element={<Detail />} />
        <Route path="*" element={<FouroFour />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
