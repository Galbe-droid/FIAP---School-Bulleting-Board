import UserList from '../components/UserList';
import { getTeachers } from '../api/auth.ts';

export default function TeacherPage() {
    return (
        <UserList
            title="Professores"
            loadUsers={getTeachers}
        />
    );
}