import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import ServiceProvided from "../../Components/Admin/ServiceProvided/ServiceProvided"


function ServiceManager() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceProvided />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceManager