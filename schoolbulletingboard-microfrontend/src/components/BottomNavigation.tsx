import {useLocation, useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

export default function BottomNavigation(){
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {label: 'Início', value: '/', icon: <HomeIcon/>},
        {label: 'Alunos', value: '/students', icon: <SearchIcon/>},
        {label: 'Professores', value: '/teachers', icon: <BookmarkIcon/>},
        {label: 'Perfil', value: '/profile', icon: <PersonIcon/>}
    ]

    const currentValue = menuItems.some(
        item => item.label === location.pathname
    ) ? location.pathname : false

    return(
        <Paper
            elevation={8}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                borderRadius: '16px 16px 0 0'
            }}
        >
            <MuiBottomNavigation
                value={currentValue}
                onChange={(_, newValue) => navigate(newValue)}
                showLabels
                sx={{
                    height: 68,
                    borderRadius: '16px 16px 0 0',
                }}
            >
                {menuItems.map(item => (
                    <BottomNavigationAction
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                    />
                ))}
            </MuiBottomNavigation>
        </Paper>
    )
}