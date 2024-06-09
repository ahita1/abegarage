import Third from "../../Components/Order/Third";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";

function ThirdPage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Third />
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirdPage;
