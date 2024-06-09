
import AdminMenu from '../../Components/Admin/AdminMenu/AdminMenu';
import CustomerProfileForm from '../../Components/Admin/CustomerProfile/CustomerProfileForm';

function CustomerProfile() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile