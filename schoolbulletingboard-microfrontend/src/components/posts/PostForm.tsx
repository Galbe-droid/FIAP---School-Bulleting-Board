import {type FormEvent, useState} from "react";
import type {ReturnPostDto} from "../../dtos/Posts/ReturnPostDto.ts";
import type {PublishedStatus} from "../../enum/PublishedStatus.ts";
import type CreatePostDto from "../../dtos/Posts/CreatePostDto.ts";
import {Alert, Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";

interface PostFormProps {
    initialData?: ReturnPostDto;
    onSubmit: (data: CreatePostDto) => Promise<void>;
    submitLabel: string;
}

export default function PostForm(props: PostFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<PublishedStatus>(props.initialData?.status ?? "DRAFT");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        setError('');
        setLoading(true);

        try{
            const create: CreatePostDto = {
                title: title,
                content: content,
                status: status,
            }
            await props.onSubmit(create);
        } catch (err: any){
            setError(
                err.response?.data?.message ??
                'Não foi possível salvar o post.'
            );
        } finally {
            setLoading(false);
        }
    }

    return(
        <Paper sx={{p: {xs: 2, sm: 4}}}>
            <Typography sx={{variant: 'h5', fontWeight: 700, mb: 3}}>
                {props.submitLabel}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Título"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Conteúdo"
                    fullWidth
                    required
                    multiline
                    minRows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                />

                <TextField
                    select
                    label="Status"
                    fullWidth
                    required
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value as PublishedStatus)
                    }
                    margin="normal"
                >
                    <MenuItem value="DRAFT">Rascunho</MenuItem>
                    <MenuItem value="PUBLISHED">Publicado</MenuItem>
                    <MenuItem value="ARCHIVED">Arquivado</MenuItem>
                </TextField>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 3 }}
                >
                    {loading ? 'Salvando...' : props.submitLabel}
                </Button>
            </Box>
        </Paper>
    )

}