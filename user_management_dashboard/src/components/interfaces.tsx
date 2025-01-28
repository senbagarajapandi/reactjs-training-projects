export interface User {
    id?: number;
    name: string;
    email: string;
    role: string
};

export interface TableProps {
    users: User[];
    deleteUser: (id:number) => void;
    editUser: (user: User) => void;
};

export interface UserFormProps {
    onSubmit: (data: User) => void;
    existingUser?: User | null;
};