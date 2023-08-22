import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage, AdminLoginPage } from "../src/pages/index";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="app row">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="admin_login" element={<AdminLoginPage />}></Route>
          <Route path="*" element={<Toolbar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
