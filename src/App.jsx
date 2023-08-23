import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  AdminLoginPage,
  MainPage,
  SettingPage,
  AdminTweetPage,
  AdminUserPage
} from "../src/pages/index";
import { AdminLayout } from './layout/layout'

function App() {
  return (
    <div className="app row">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="admin_login" element={<AdminLoginPage />}></Route>
          <Route path="setting" element={<SettingPage />}></Route>
          <Route element={<AdminLayout/>}>
            <Route path="admin_tweets" element={<AdminTweetPage/>}></Route>
            <Route path="admin_users" element={<AdminUserPage/>}></Route>
          </Route>
          <Route path="*" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
