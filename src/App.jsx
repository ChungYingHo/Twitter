import "./App.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
  UserFollowing,
  UserFollowers,
} from "../src/pages/index";
import { AdminLayout, MainLayout } from "./layout/layout";
import { UserContextProvider } from "./context/UserContext";
import { ErrorProvider } from "./context/ErrorContext";

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="app row">
      <UserContextProvider>
        <ErrorProvider>
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<LoginPage />}></Route>
              <Route path="register" element={<RegisterPage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="admin_login" element={<AdminLoginPage />}></Route>
              {/* 共用 MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/main" element={<MainPage />}></Route>
                <Route path="/user/:id" element={<UserPage />}></Route>
                <Route
                  path="/user/:id/followers"
                  element={<UserFollowers />}
                ></Route>
                <Route
                  path="/user/:id/following"
                  element={<UserFollowing />}
                ></Route>
                <Route path="setting" element={<SettingPage />}></Route>
                <Route
                  path="main/:tweet_id"
                  element={<MainReplyList />}
                ></Route>
              </Route>
              {/* 共用 AdminLayout */}
              <Route element={<AdminLayout />}>
                <Route path="admin_tweets" element={<AdminTweetPage />}></Route>
                <Route path="admin_users" element={<AdminUserPage />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
