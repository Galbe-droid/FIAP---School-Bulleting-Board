import {useState, type FormEvent } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import type RegisterUserDto from "../types/User/RegisterUserDto";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {UserRole} from "../enum/UserRole.ts";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState<RegisterUserDto>({
        username: "",
        email: "",
        password: "",
        role: UserRole.STUDENT
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            await api.post("/users", user);

            navigate("/login");
        } catch (error) {
            console.error(error);

            setError(
                "Não foi possível criar o usuário."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                >
                    Criar conta
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        required
                        label="Nome de usuário"
                        margin="normal"
                        value={user.username}
                        onChange={(event) =>
                            setUser({
                                ...user,
                                username: event.target.value,
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        required
                        type="email"
                        label="Email"
                        margin="normal"
                        value={user.email}
                        onChange={(event) =>
                            setUser({
                                ...user,
                                email: event.target.value,
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        required
                        type="password"
                        label="Senha"
                        margin="normal"
                        value={user.password}
                        onChange={(event) =>
                            setUser({
                                ...user,
                                password: event.target.value,
                            })
                        }
                    />

                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel>
                            Tipo de usuário
                        </FormLabel>

                        <RadioGroup
                            value={user.role}
                            onChange={(event) =>
                                setUser({
                                    ...user,
                                    role: event.target.value as UserRole,
                                })
                            }
                        >
                            <FormControlLabel
                                value={UserRole.STUDENT}
                                control={<Radio />}
                                label="Aluno"
                            />

                            <FormControlLabel
                                value={UserRole.TEACHER}
                                control={<Radio />}
                                label="Professor"
                            />
                        </RadioGroup>
                    </FormControl>

                    {error && (
                        <Typography
                            color="error"
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
                        {loading
                            ? "Criando..."
                            : "Criar conta"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Register;