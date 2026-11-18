import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ReturnPostDto} from "../dtos/Posts/ReturnPostDto.ts";
import {getPostById, updatePost} from "../api/posts.ts";
import {Alert, Button, CircularProgress, Container} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import PostForm from "../components/posts/PostForm.tsx";

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<ReturnPostDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = await getPostById(id!);
                setPost(response);
            } catch {
                setError('Não foi possível carregar o post.');
            } finally {
                setLoading(false);
            }
        };

        loadPost();
    }, [id]);

    const handleUpdate = async (data: any) => {
        await updatePost(id!, data);
        navigate(`/posts/${id}`);
    };

    if (loading) {
        return (
            <Container sx={{ py: 5, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error || !post) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    {error || 'Post não encontrado.'}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(`/posts/${id}`)}
                sx={{ mb: 3 }}
            >
                Voltar
            </Button>

            <PostForm
                initialData={{
                    title: post.title,
                    content: post.content,
                    status: post.status
                } as ReturnPostDto}
                submitLabel="Salvar alterações"
                onSubmit={handleUpdate}
            />
        </Container>
    );
}