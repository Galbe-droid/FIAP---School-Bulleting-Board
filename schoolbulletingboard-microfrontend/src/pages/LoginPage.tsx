import {useNavigate} from "react-router-dom";
import {type FormEvent, useState} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {EmailOutlined, LockOutlined, Visibility, VisibilityOff} from "@mui/icons-material";

export default function LoginPage(){
    const navigate = useNavigate();
    const { signIn, loading } = useAuth();

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('')

        try{
            await signIn({email, password})
            navigate('/')
        } catch {
            setError('E-mail ou senha inválidos.')
        }
    }

    return(
        <Container maxWidth='xs' sx={{py: 6}}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography sx={{
                    color: 'text.primary',
                    variant: 'h4',
                    fontWeight: 'bold',
                }}>
                    School Board
                </Typography>

                <Typography sx={{
                    color: 'text.secondary',
                    mt:1
                }}>
                    Entre na sua conta
                </Typography>
            </Box>

            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography sx={{
                    variant: 'h5',
                    fontWeight: 'bold',
                    mb: 3
                }}>
                    Login
                </Typography>
                {error && (
                    <Alert severity='error' sx={{ mb: 2}}>
                        {error}
                    </Alert>
                )}

                <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                        label= "E-Mail"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        margin="normal"
                        autoComplete='email'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailOutlined/>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <TextField
                        label= "Senha"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        margin="normal"
                        autoComplete='current-password'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockOutlined />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            aria-label="Mostrar ou ocultar senha"
                                        >
                                            {showPassword
                                                ? <VisibilityOff />
                                                : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading || !email || !password}
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        {loading
                            ? <CircularProgress size={24} color="inherit" />
                            : 'Entrar'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}