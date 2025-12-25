import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import { useLinks } from "../../utils/useLinks";

export default function Layout() {
  const links = useLinks();

  return (
    <div className={styles.layout}>
      <Header />
      <Navbar items={links} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
