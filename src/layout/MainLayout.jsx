import { Outlet } from "react-router-dom";
import ToolBar from '../components/Toolbar'

export default function MainLayout(){
    return(
        <>
            <ToolBar/>
            <Outlet/>
        </>
    )
}