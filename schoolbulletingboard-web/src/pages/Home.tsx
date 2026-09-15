import {useEffect, useState} from "react";
import type {ReturnPostDto} from "../types/Post/ReturnPostDto.ts";
import { getPosts } from "../services/postService.ts";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import PostCard from "../components/PostCard/PostCard.tsx";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
    postsUpdated: number;
}

function Home(){
    const [posts, setPosts] = useState<ReturnPostDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { postsUpdated } = useOutletContext<LayoutContext>();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await getPosts();

                setPosts(data);
            } catch (error) {
                console.error(error);
                setError("Não foi possível carregar as postagens.");
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [postsUpdated]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
            >
                Postagens
            </Typography>

            {posts.length === 0 ? (
                <Typography color="text.secondary">
                    Nenhuma postagem encontrada.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid
                            key={post.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <PostCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default Home;