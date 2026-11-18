import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import BottomNavigation from "./BottomNavigation.tsx";

export default function AppLayout(){
    return(
        <Box sx={{minHeight: '100vh', pb: '80px'}}>
            <Outlet/>
            <BottomNavigation/>
        </Box>
    )
}