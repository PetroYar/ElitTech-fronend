import "./styles/global.scss";
import "./styles/null.scss";

import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Layout from "./components/Loyouts/Loyout";
import AddSurvey from "./pages/AddSurvey/AddSurvey";
import Office from "./pages/Office/Office";
import Survey from "./pages/Survey/Survey";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-survey" element={<AddSurvey />} />
          <Route path="/office" element={<Office />} />
          <Route path="/survey/:slug" element={<Survey/>} />

          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
