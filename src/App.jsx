import "./styles/null.scss";
import "./styles/global.scss";

import { Route, Routes } from "react-router-dom";

import PrivateLayout from "./PrivateLoyout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Layout from "./components/Loyouts/Loyout";
import AddSurvey from "./pages/AddSurvey/AddSurvey";
import Office from "./pages/Office/Office";
import Survey from "./pages/Survey/Survey";
import EditSurvey from "./pages/EditSurvey/EditSurvey";
import SurveyResults from "./pages/SurveyResults/SurveyResults";
import { Toaster } from "react-hot-toast";


function App() {
   
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff" },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add-survey" element={<AddSurvey />} />
            <Route path="/office" element={<Office />} />
            <Route path="/survey/:slug" element={<Survey />} />
            <Route path="/edit-survey/:slug" element={<EditSurvey />} />
            <Route path="/result/:id" element={<SurveyResults />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
