import {useNavigate} from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginIcon from '@mui/icons-material/Login';
import {
    Alert, Avatar, Box, Button, Container,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography
} from "@mui/material";
import {useAuth} from "../contexts/AuthContext.tsx";
import {DeleteForever, Logout} from "@mui/icons-material";
import {useState} from "react";
import {deleteAccount} from "../api/auth.ts";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, authenticated, signOut } = useAuth();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const handleDeleteAccount = async () => {
        try {
            setDeleting(true);
            setDeleteError('');

            await deleteAccount();

            signOut();
            navigate('/login', { replace: true });

        } catch (err: any) {
            setDeleteError(
                err.response?.data?.message ||
                'Não foi possível excluir sua conta.'
            );
        } finally {
            setDeleting(false);
        }
    };

    const menuItems = [
        {label: 'Informações da conta', icon: <PersonOutlineIcon/>},
        {label: 'Notificações', icon: <NotificationsNoneIcon/>},
        {label: 'Configurações', icon: <SettingsOutlinedIcon/>},
        {label: 'Ajuda', icon: <HelpOutlineIcon/>},
    ]

    const handleLogout = () => {
        signOut();
        navigate('/');
    }

    return (
        <Container maxWidth="sm" sx={{ py: 3 }}>
            <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
                Meu perfil
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p:3,
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    sx={{
                        width: 76,
                        height: 76,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.light'
                    }}
                >
                    <PersonOutlineIcon fontSize='large'/>
                </Avatar>

                <Typography variant='h6'>
                    {authenticated ? user?.username : 'Visitante'}
                </Typography>

                {authenticated ? (
                    <>
                        <Typography sx={{ color: 'text.secondary', mt: 1}}>
                            Perfil: {user?.email}
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', mt: 1}}>
                            Perfil: {user?.role}
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/register')}
                            sx={{ mt: 2 }}
                        >
                            Criar nova conta
                        </Button>

                        <Button
                            color='error'
                            startIcon={<Logout/>}
                            onClick={handleLogout}
                            fullWidth
                            sx={{ variant: 'outlined', mt: 3 }}
                        >
                            Lougout
                        </Button>
                    </>

                ) : (
                    <>
                        <Typography variant='body2' color='textSecondary' sx={{ mb: 3 }}>
                            Entre para acessar sua conta
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<LoginIcon/>}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </>
                )}
            </Paper>

            <Typography
                variant='subtitle1'
                sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}
            >
                Preferências
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    border: 1,
                    borderColor: 'divider',
                }}
            >
                <List disablePadding>
                    {menuItems.map((item, index) => (
                        <Box key={item.label}>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'primary.main', minWidth: 42}}>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText primary={item.label}/>

                                <ChevronRightIcon color="action"/>
                            </ListItemButton>

                            {index !== menuItems.length -1 && <Divider/>}
                        </Box>
                    ))}
                </List>
            </Paper>
            {authenticated ? (
                <Box sx={{ mt: 5 }}>
                    <Divider sx={{ mb: 3 }} />

                    <Typography
                        sx={{
                            variant: 'subtitle1',
                            color: 'error',
                            fontWeight: 700
                        }}
                    >
                        Zona de perigo
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        Excluir sua conta é uma ação permanente.
                        Suas publicações continuarão disponíveis.
                    </Typography>

                    {deleteError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {deleteError}
                        </Alert>
                    )}

                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<DeleteForever />}
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Excluir minha conta
                    </Button>
                </Box>
            ) : (
                <></>
            )}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => !deleting && setDeleteDialogOpen(false)}
            >
                <DialogTitle>
                    Excluir sua conta?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Tem certeza de que deseja excluir sua conta?

                        <br /><br />

                        Essa ação não poderá ser desfeita. Suas publicações
                        permanecerão disponíveis, mas não estarão mais
                        associadas ao seu usuário.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={deleting}
                    >
                        Cancelar
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                    >
                        {deleting ? 'Excluindo...' : 'Sim, excluir conta'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}