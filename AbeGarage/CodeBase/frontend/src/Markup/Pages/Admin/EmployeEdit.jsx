import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import EmployeesEditForm from "../../Components/Admin/EmployeesEdit/EmployeesEditForm";


function EmployeEdit() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EmployeesEditForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeEdit