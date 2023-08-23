import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/AdminSideBar";

export default function AdminLayout(){
    return(
        <>
            <AdminSideBar/>
            <Outlet/>
        </>
    )
}