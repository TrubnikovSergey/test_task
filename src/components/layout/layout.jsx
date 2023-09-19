import { Outlet } from "react-router-dom";
import SideMenu from "../sidemenu/Sidemenu";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <div className="sidemenu">
        <SideMenu />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
