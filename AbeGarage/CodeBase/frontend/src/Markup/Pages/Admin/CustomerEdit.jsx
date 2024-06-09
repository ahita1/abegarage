import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import CustomerEditForm from "../../Components/Admin/CustomerEdit/CustomerEditForm";


function CustomerEdit() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerEditForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerEdit