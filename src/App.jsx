import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  AdminLoginPage,
  MainPage,
  SettingPage,
  UserPage,
} from "../src/pages/index";

function App() {
  return (
    <div className="app row">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="admin_login" element={<AdminLoginPage />}></Route>
          <Route path="setting" element={<SettingPage />}></Route>
          <Route path="*" element={<MainPage />}></Route>
          <Route path="user" element={<UserPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
