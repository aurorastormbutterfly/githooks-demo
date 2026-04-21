import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div>
      <Header
        title="Understanding Git Hooks"
        subtitle="Automate your workflow and enforce code quality right from your local repository."
      />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
