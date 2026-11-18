import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";
import {useEffect, useState} from "react";
import {deletePost, getPostById} from "../api/posts.ts";
import type {ReturnPostDto} from "../dtos/Posts/ReturnPostDto.ts";
import {Alert, Avatar, Box, Button, CircularProgress, Container, Divider, Paper, Typography} from "@mui/material";
import {ArrowBack, Delete, Edit} from "@mui/icons-material";

export default function PostDetailPage(){
    const { id } = useParams();
    const navigate = useNavigate();

    const { user, authenticated } = useAuth();

    const [ post, setPost ] = useState<ReturnPostDto | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try{
                setLoading(true);
                const response = await getPostById(id!);
                setPost(response)
            } catch {
                setError('Não foi possível carregar o post.')
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id])

    const canManagePost = authenticated && user?.role === 'TEACHER' && user?.id === post?.authorId

    const handleDelete = async() => {
        if(!post) return;

        const confirmed = window.confirm('Tem certeza que deseja excluir este post?')

        if(!confirmed) return;

        try{
            await deletePost(id!);
            navigate('/');  
        } catch {
            setError('Não foi possível excluir o post.');
        }
    }

    if(loading){
        return(
            <Box sx={{display: 'flex', justifyContent: 'center', py: 6}}>
                <CircularProgress/>
            </Box>
        )
    }

    if(error && !post) {
        return(
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>

                <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Voltar
                </Button>
            </Container>
        )
    }

    if (!post) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography>Post não encontrado.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Voltar
            </Button>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography sx={{variant: 'h4', fontWeight: 700}} gutterBottom>
                    {post.title}
                </Typography>

                <Box sx={{display:"flex", alignItems:"center", gap: 1.5, my: 2}}>
                    <Avatar>
                        {post.authorId ?? '?'}
                    </Avatar>
                </Box>

                <Divider sx={{ my: 3 }} />

                {post.content && (
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {post.content}
                    </Typography>
                )}

                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.8,
                        overflowWrap: 'anywhere'
                    }}
                >
                    {post.content}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="caption" color="text.secondary">
                    ID do post: {post.id}
                </Typography>

                {canManagePost && (
                    <Box sx={{display:"flex", alignItems:"center", gap: 2, mt: 3}}>
                        <Button
                            variant="contained"
                            startIcon={<Edit />}
                            onClick={() => navigate(`/posts/${post.id}/edit`)}
                        >
                            Editar
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={handleDelete}
                        >
                            Excluir
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
