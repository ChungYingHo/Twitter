import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  AdminLoginPage,
  MainPage,
  SettingPage,
  AdminTweetPage,
  AdminUserPage,
  UserPage,
  MainReplyList,
} from "../src/pages/index";
import { AdminLayout, MainLayout } from "./layout/layout";

function App() {
  return (
    <div className="app row">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="admin_login" element={<AdminLoginPage />}></Route>
          <Route element={<MainLayout/>}>
              <Route path="*" element={<MainPage />}></Route>
              <Route path="/main" element={<MainPage />}></Route>
              <Route path="user" element={<UserPage />}></Route>
              <Route path="setting" element={<SettingPage />}></Route>
              <Route path="main/:tweet_id" element={<MainReplyList />}></Route>
          </Route>
          <Route element={<AdminLayout />}>
              <Route path="admin_tweets" element={<AdminTweetPage />}></Route>
              <Route path="admin_users" element={<AdminUserPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
