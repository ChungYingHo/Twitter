import { Outlet, useLocation } from "react-router-dom";
import styled from 'styled-components'
import ToolBar from '../components/Toolbar'
import PopularBar from "../components/PopularBar";
import { PopupProvider } from "../context/Popup";

const Area1 = styled.div`
    width: 15.6%;
    position: relative;
    padding: 0;
`
const Area2 = styled.div`
    width: 56.2%;
    padding: 0;
`

const Area3 = styled.div`
    width: 23.9%;
    position: relative;
    padding: 0;
`

export default function MainLayout(){
    const location = useLocation()
    return(
        <>
            <PopupProvider>
                <Area1>
                    <ToolBar/>
                </Area1>
                <Area2>
                    <Outlet/>
                </Area2>
                <Area3>
                    {location.pathname.includes('/setting') ? <div style={{width: '23.9%'}}/> : <PopularBar/>}
                </Area3>
            </PopupProvider>
        </>
    )
}