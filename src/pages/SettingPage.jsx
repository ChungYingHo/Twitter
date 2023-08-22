import AuthInput from "../components/AuthInput";
import ToolBar from "../components/Toolbar";
// import { useState } from "react";
// import { Link } from "react-router-dom";

const SettingPage = () => {
  return (
    <>
      <ToolBar />
      <div className="col">
        <AuthInput />;
      </div>
    </>
  );
};

export default SettingPage;
