import AdminDashbord from "../../Components/Admin/AdminDashbord/AdminDashbord";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
function AdminDashBoard() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AdminDashbord />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard