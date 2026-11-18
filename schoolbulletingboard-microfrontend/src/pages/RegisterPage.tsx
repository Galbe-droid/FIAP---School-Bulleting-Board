import {useNavigate} from "react-router-dom";
import {type FormEvent, useState} from "react";
import {register} from "../api/auth.ts";
import type CreateUserDto from "../dtos/User/CreateUserDto.ts";
import {useAuth} from "../contexts/AuthContext.tsx";
import {Alert, Box, Button, Container, Paper, TextField, Typography} from "@mui/material";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const {user} = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError('');
        setSuccess('');
        setLoading(true);

        try{
            const createUser: CreateUserDto = {
                username: username,
                email: email,
                password: password,
                role: user?.role,
            }
            console.log(createUser);
            await register(createUser);

            setSuccess('Conta criada com sucesso!');

            setTimeout(() => navigate('/profile'), 1200);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                'Não foi possível criar a conta.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth='sm'>
            <Box sx={{py:5}}>
                <Paper sx={{ p:3 }}>
                    <Typography sx={{ variant: 'h5', fontWeight: '700', mb: 1 }}>
                        Criar Conta
                    </Typography>

                    <Typography color="text.secondary" sx={{mb:3}}>
                        Cadastre um novo usuário.
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Nome de usuário"
                            fullWidth
                            required
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            required
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            required
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{ mt: 3 }}
                        >
                            {loading ? 'Criando...' : 'Criar conta'}
                        </Button>

                        <Button
                            fullWidth
                            onClick={() => navigate('/profile')}
                            sx={{ mt: 1 }}
                        >
                            Voltar
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}