import { Outlet, useLocation } from "react-router-dom";
import ToolBar from '../components/Toolbar'
import PopularBar from "../components/PopularBar";
import { PopupProvider } from "../context/Popup";

export default function MainLayout(){
    const location = useLocation()
    return(
        <>
            <PopupProvider>
                <ToolBar/>
                <Outlet/>
                {location.pathname.includes('/setting') ? <div style={{width: '23.9%'}}/> : <PopularBar/>}
            </PopupProvider>
            
        </>
    )
}