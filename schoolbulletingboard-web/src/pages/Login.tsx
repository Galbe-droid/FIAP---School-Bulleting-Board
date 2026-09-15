import useAuth from "../hook/useAuth.ts";
import {type FormEvent, useState} from "react";
import {loginRequest} from "../services/authService.ts";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        console.log("1 - clicou no login");

        try{
            const data = await loginRequest({email, password});
            console.log("2 - recebeu resposta:", data);
            login(data.token)
            console.log("3 - chamou login()");
            navigate("/home")
            console.log("4 - chamou navigate()");
        }catch (error){
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Login
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Entre para acessar o School Bulletin Board.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        required
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        required
                        label="Senha"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />

                    {error && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ mt: 2 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>

                    <Button
                        variant="text"
                        onClick={() => navigate("/register")}
                    >
                        Criar uma conta
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}