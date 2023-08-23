import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";


export default function Test(){
    return(
        <>
            <AdminSideBar/>
            <Outlet/>
        </>
    )
}