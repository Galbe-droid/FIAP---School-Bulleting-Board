import { useEffect, useState } from 'react';
import {
    Alert,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import type ReturnUserDto from "../dtos/User/ReturnUserDto.ts";

interface UserListProps {
    title: string;
    loadUsers: () => Promise<ReturnUserDto[]>;
}

export default function UserList({ title, loadUsers }: UserListProps) {
    const [users, setUsers] = useState<ReturnUserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await loadUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
                setError('Não foi possível carregar a lista de usuários.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [loadUsers]);

    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {title}
            </Typography>

            {loading && <CircularProgress />}

            {!loading && error && (
                <Alert severity="error">{error}</Alert>
            )}

            {!loading && !error && users.length === 0 && (
                <Typography color="text.secondary">
                    Nenhum usuário encontrado.
                </Typography>
            )}

            {!loading && !error && users.length > 0 && (
                <List>
                    {users.map((user) => (
                        <ListItem key={user.id} divider>
                            <ListItemText
                                primary={user.username}
                                secondary={user.email}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}