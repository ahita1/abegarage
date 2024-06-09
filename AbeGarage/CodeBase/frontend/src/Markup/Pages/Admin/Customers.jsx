
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
import LoginForm from "../../Components/LoginForm/LoginForm";



import AdminMenu from '../../Components/Admin/AdminMenu/AdminMenu';
import CustomerListForm from '../../Components/Admin/CustomerList/CustomerListForm';

function Customers() {
   // Destructure the auth hook
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    console.log("Kebede");

    if (isAdmin) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerListForm />
          </div>
        </div>
      </div>
    </div>
  );
 } else {
      return (
        <div>
          <h1>You are not authorized to access this page</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }}

export default Customers;