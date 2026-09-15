import {useEffect, useState } from "react";
import type UpdatePostDto from "../types/Post/UpdatePostDto.ts";
import {useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/postService.ts";
import { PublishedStatus } from "../enum/PublishedStatus.ts";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<UpdatePostDto>({
        title: "",
        content: "",
        status: PublishedStatus.PUBLISHED,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            if (!id) {
                setError("Postagem não encontrada.");
                setLoading(false);
                return;
            }

            try {
                const data = await getPostById(id);

                setPost({
                    title: data.title,
                    content: data.content,
                    status: data.status,
                });
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

    const handleSubmit = async () => {
        setError("");

        if (!post.title!.trim() || !post.content!.trim()) {
            setError("Preencha o título e o conteúdo.");
            return;
        }

        if (!id) {
            setError("Postagem não encontrada.");
            return;
        }

        try {
            setSaving(true);

            await updatePost(id, post);

            navigate(`/posts/${id}`);
        } catch (error) {
            console.error(error);

            setError(
                "Não foi possível atualizar a postagem."
            );
        } finally {
            setSaving(false);
        }
    };

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

    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 3 }}
            >
                Editar postagem
            </Typography>

            <TextField
                fullWidth
                label="Título"
                margin="normal"
                value={post.title}
                onChange={(event) =>
                    setPost({
                        ...post,
                        title: event.target.value,
                    })
                }
            />

            <TextField
                fullWidth
                multiline
                minRows={8}
                label="Conteúdo"
                margin="normal"
                value={post.content}
                onChange={(event) =>
                    setPost({
                        ...post,
                        content: event.target.value,
                    })
                }
            />

            <FormControl
                fullWidth
                margin="normal"
            >
                <InputLabel>Status</InputLabel>

                <Select
                    value={post.status}
                    label="Status"
                    onChange={(event) =>
                        setPost({
                            ...post,
                            status: event.target.value as PublishedStatus,
                        })
                    }
                >
                    <MenuItem value={PublishedStatus.PUBLISHED}>
                        Publicado
                    </MenuItem>

                    <MenuItem value={PublishedStatus.DRAFT}>
                        Rascunho
                    </MenuItem>

                    <MenuItem value={PublishedStatus.ARCHIVED}>
                        Arquivado
                    </MenuItem>
                </Select>
            </FormControl>

            {error && (
                <Typography
                    color="error"
                    sx={{ mt: 2 }}
                >
                    {error}
                </Typography>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 3,
                }}
            >
                <Button
                    variant="outlined"
                    disabled={saving}
                    onClick={() =>
                        navigate(`/posts/${id}`)
                    }
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    disabled={saving}
                    onClick={handleSubmit}
                >
                    {saving
                        ? "Salvando..."
                        : "Salvar alterações"}
                </Button>
            </Box>
        </Box>
    );
}

export default EditPost;