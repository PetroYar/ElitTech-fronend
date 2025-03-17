
import "./styles/global.scss";
import "./styles/null.scss";
 
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Layout from "./components/Loyouts/Loyout";

function App() {
  

  return (
    <div >
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
