
import AdminMenu from '../../Components/Admin/AdminMenu/AdminMenu';
import AddCustomer from '../../Components/Admin/AddCustomer/AddCustomer';

function AddCustomerPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
         <AddCustomer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerPage