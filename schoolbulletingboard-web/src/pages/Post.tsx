import {Box, Button, Chip, CircularProgress, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ReturnPostDto} from "../types/Post/ReturnPostDto.ts";
import {deletePost, getPostById} from "../services/postService.ts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import useAuth from "../hook/useAuth.ts";

function DeleteIcon() {
    return null;
}

function Post() {
    const { id } = useParams();
    const { role } = useAuth()
    const navigate = useNavigate();
    const [post, setPost] = useState<ReturnPostDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!id) {
            return;
        }

        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta postagem?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deletePost(id);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setError("Não foi possível excluir a postagem.");
        }
    };

    useEffect(() => {
        const loadPost = async () => {
            if (!id) {
                setError("Postagem não encontrada.");
                setLoading(false);
                return;
            }

            try {
                const data = await getPostById(id);

                setPost(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Não foi possível carregar a postagem."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [id]);

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

    if (error || !post) {
        return (
            <Typography color="error">
                {error || "Postagem não encontrada."}
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: 900,
                mx: "auto",
            }}
        >
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/home")}
            >
                Voltar
            </Button>

            {role === "TEACHER" && (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/posts/${post.id}/edit`)}
                    >
                        Editar
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Excluir
                    </Button>
                </Box>
            )}
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
            >
                {post.title}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Chip label={post.status} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Autor: {post.authorId}
                </Typography>
            </Box>

            <Typography
                variant="body1"
                sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                }}
            >
                {post.content}
            </Typography>
        </Box>
    );
}

export default Post;