import { Outlet, useLocation } from "react-router-dom";
import ToolBar from '../components/Toolbar'
import PopularBar from "../components/PopularBar";

export default function MainLayout(){
    const location = useLocation()
    return(
        <>
            <ToolBar/>
            <Outlet/>
            {location.pathname.includes('/setting') ? <div style={{width: '23.9%'}}/> : <PopularBar/>}
        </>
    )
}