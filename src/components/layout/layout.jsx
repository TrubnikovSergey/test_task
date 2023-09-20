import { Outlet, useLocation } from "react-router-dom";
import SideMenu from "../sidemenu/Sidemenu";
import "./layout.css";

const Layout = () => {
  const location = useLocation();
  const isOutlet = location.pathname === "/";

  return (
    <div className="layout-wrapper">
      <div className="sidemenu">
        <SideMenu />
      </div>
      <div className="content">{isOutlet ? <h1 style={{ textAlign: "center" }}>Выберите пункт меню</h1> : <Outlet />}</div>
    </div>
  );
};

export default Layout;
