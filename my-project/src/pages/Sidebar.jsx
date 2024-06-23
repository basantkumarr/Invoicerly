import { Outlet } from "react-router-dom";

import Dashboard from "./Dashboard";

const Sidebar = () => {
  return (
    <div>
      <Dashboard /> {/* Display Dashboard component */}
      <Outlet /> {/* Add an Outlet component to render nested routes */}
    </div>
  );
}

export default Sidebar;