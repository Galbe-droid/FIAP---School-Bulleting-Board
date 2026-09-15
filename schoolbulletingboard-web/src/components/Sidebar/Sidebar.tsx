import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAuth from "../../hook/useAuth.ts";
import {useState} from "react";
import CreatePostDialog from "../CreatePostDialog/CreatePostDialog.tsx";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";

interface SidebarProps {
    onPostCreated: () => void;
}

function Sidebar({ onPostCreated }: SidebarProps) {
    const { role, logout } = useAuth();
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <Box
                sx={{
                    width: 240,
                    minHeight: "100vh",
                    backgroundColor: "background.paper",
                    borderRight: "1px solid",
                    borderColor: "divider",
                    p: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    School Bulletin Board
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {role === "TEACHER" && (
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() =>
                            setOpenCreatePost(true)
                        }
                    >
                        Nova postagem
                    </Button>
                )}
                <Box sx={{ flexGrow: 1 }} />

                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            <CreatePostDialog
                open={openCreatePost}
                onClose={() => setOpenCreatePost(false)}
                onCreated={onPostCreated}
            />
        </>
    );
}

export default Sidebar;