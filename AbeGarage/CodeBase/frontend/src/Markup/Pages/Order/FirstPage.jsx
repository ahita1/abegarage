import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
import First from "../../Components/Order/First"


function FirstPage() {
  return (
    <>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <First />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstPage