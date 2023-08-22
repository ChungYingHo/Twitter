import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../src/pages/index";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="app row">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="*" element={<Toolbar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
