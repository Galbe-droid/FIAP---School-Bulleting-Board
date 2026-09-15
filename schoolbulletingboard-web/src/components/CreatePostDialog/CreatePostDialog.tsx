import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {createPost} from "../../services/postService.ts";
import type CreatePostDto from "../../types/Post/CreatePostDto.ts";
import {PublishedStatus} from "../../enum/PublishedStatus.ts";

interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

function CreatePostDialog({open, onClose, onCreated}: CreatePostDialogProps) {
    const [post, setPost] = useState<CreatePostDto>({
        title: "",
        content: "",
        status: PublishedStatus.PUBLISHED
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");

        if (!post.title.trim() || !post.title.trim()) {
            setError("Preencha o título e o conteúdo.");
            return;
        }

        try {
            setLoading(true);

            await createPost(post);

            setPost({
                title: "",
                content: "",
                status: PublishedStatus.PUBLISHED
            });

            onCreated();
            onClose();
        } catch (error) {
            console.error(error);

            setError("Não foi possível criar a postagem.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Nova postagem
            </DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    label="Título"
                    margin="normal"
                    value={post.title}
                    onChange={(event) =>
                        setPost({...post, title: event.target.value})
                    }
                />

                <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    label="Conteúdo"
                    margin="normal"
                    value={post.content}
                    onChange={(event) =>
                        setPost({...post, content: event.target.value})
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
                            setPost({...post, status: event.target.value})
                        }
                    >
                        <MenuItem value="PUBLISHED">
                            Publicado
                        </MenuItem>

                        <MenuItem value="DRAFT">
                            Rascunho
                        </MenuItem>

                        <MenuItem value="ARCHIVED">
                            Arquivado
                        </MenuItem>
                    </Select>
                </FormControl>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Criando..." : "Criar postagem"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePostDialog;