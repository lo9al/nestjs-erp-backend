import { Role } from '../../../common/decorators/roles.decorator';
export declare class User {
    id: string;
    email: string;
    fullName: string;
    password: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
