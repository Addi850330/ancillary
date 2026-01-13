import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Mask from "../components/Mask";
import Accountpop from "../components/Accountpop";
const MainLayout = () => {
  return (
    <>
      <Accountpop />
      <Mask />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
