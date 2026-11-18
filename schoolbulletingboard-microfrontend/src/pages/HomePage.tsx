import {
    Alert,
    Box, Button, Card, CardActions, CardContent, Chip,
    CircularProgress, Container, InputAdornment, TextField, Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type {ReturnPostDto} from "../dtos/Posts/ReturnPostDto.ts";
import {useEffect, useState} from "react";
import {getPosts} from "../api/posts.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

export default function HomePage() {
    const navigate = useNavigate();
    const [post, setPost] = useState<ReturnPostDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const {user, authenticated} = useAuth();

    useEffect(() => {
        const loadPosts = async() => {
            try{
                setLoading(true);
                const data = await getPosts();
                setPost(data);
            } catch (err){
                setError("Não foi possivel carregar os posts")
                console.log(err)
            } finally {
                setLoading(false);
            }
        }

        void loadPosts();
    }, []);

    const filteredPosts = post.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return(
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography
                    sx={{
                        variant: 'h4',
                        fontWeight: 'bold',
                    }}
                >
                    School Board
                </Typography>

                <Typography
                    sx={{
                        variant: 'body2',
                        color: 'text.secondary',
                    }}
                >
                    School Board
                </Typography>
            </Box>

            <TextField
                fullWidth
                placeholder="Pesquisar publicações"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    variant: 'outlined',
                    mb: 3
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }
                }}
            />

            {authenticated && user?.role === 'TEACHER' && (
                <Button
                    variant="contained"
                    onClick={() => navigate('/posts/create')}
                    sx={{ mb: 3}}
                >
                    Criar post
                </Button>
            )}

            <Typography
                sx={{
                    variant: 'h6',
                    fontWeight: 'bold',
                    mb: 3
                }}
            >
                Últimas publicações
            </Typography>

            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 4
                    }}
                >
                    <CircularProgress/>
                </Box>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && filteredPosts.length === 0 && (
                <Typography
                    color='text.secondary'
                >
                    Nenhuma publicação encontrada
                </Typography>
            )}

            {!loading && !error && filteredPosts.map(post => (
                <Card key={post.id} sx={{ mb: 2, borderRadius: 3, cursor: 'pointer' }}  onClick={() => navigate(`/posts/${post.id}`)}>
                    <CardContent>
                        <Chip
                            label={post.status}
                            size="small"
                            color="primary"
                        />

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {post.title}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            Publicado por {post.authorId ?? 'Professor'}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ mt: 2 }}
                            color="text.secondary"
                        >
                            {post.content.substring(0, 120)}...
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small">
                            Ler publicação
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    )
}