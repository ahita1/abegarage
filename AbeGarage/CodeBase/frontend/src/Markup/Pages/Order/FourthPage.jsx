import Fourth from "../../Components/Order/Fourth";
import AdminMenu from "../../Components/Admin/AdminMenu/AdminMenu";
function FourthPage() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Fourth />
          </div>
        </div>
      </div>
    </>
  );
}
export default FourthPage;
