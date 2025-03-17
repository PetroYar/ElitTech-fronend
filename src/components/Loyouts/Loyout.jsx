import { Outlet } from "react-router-dom";
import Header from "../Header/Header";


const Layout = () => {
  return (
    <>
      <Header />
      <main className="main__container">
        <Outlet /> {/* Тут буде рендеритись контент конкретної сторінки */}
      </main>
    </>
  );
};

export default Layout;
