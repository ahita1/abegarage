import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import AddVehicleForm from "../../Components/Admin/AddVehicle/AddVehicleForm";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../Components/LoginForm/LoginForm";

function AddVehicle() {
  const Navigate = useNavigate();
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <AddVehicleForm />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return Navigate("/unauthorized");
    }
  } else {
    return <LoginForm />;
  }
}

export default AddVehicle;
