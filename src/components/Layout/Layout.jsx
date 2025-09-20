import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from "./Layout.module.css"

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}