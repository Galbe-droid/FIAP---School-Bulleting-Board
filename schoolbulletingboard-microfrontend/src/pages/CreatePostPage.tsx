import {useNavigate} from "react-router-dom";
import type CreatePostDto from "../dtos/Posts/CreatePostDto.ts";
import {createPost} from "../api/posts.ts";
import {Button, Container } from "@mui/material";
import PostForm from "../components/posts/PostForm.tsx";
import { ArrowBack } from "@mui/icons-material";

export default function CreatePostPage() {
    const navigate = useNavigate();

    const handleCreate = async(data: CreatePostDto) => {
        const post = await createPost(data);

        navigate(`/posts/${post.id}`)
    }

    return(
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Voltar
            </Button>

            <PostForm
                submitLabel="Publicar post"
                onSubmit={handleCreate}
            />
        </Container>
    )
}