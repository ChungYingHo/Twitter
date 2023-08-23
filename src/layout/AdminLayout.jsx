import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";

export default function AdminLayout(){
    return(
        <>
            <AdminSideBar/>
            <Outlet/>
        </>
    )
}