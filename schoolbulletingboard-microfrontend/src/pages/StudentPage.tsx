import UserList from '../components/UserList';
import { getStudents } from '../api/auth.ts';

export default function StudentPage() {
    return (
        <UserList
            title="Alunos"
            loadUsers={getStudents}
        />
    );
}