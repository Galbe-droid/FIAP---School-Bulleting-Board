import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import {useState} from "react";

function MainLayout() {
    const [postsUpdated, setPostsUpdated] = useState(0);

    const handlePostCreated = () => {
        setPostsUpdated((value) => value + 1);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar onPostCreated={handlePostCreated} />

            <Box
                component="main"
                sx={{
                    flex: 1,
                    p: 4,
                }}
            >
                <Outlet context={{ postsUpdated }} />
            </Box>
        </Box>
    );
}

export default MainLayout;