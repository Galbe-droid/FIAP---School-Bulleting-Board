const UserRole = {
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];

export { UserRole };