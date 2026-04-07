import { Role } from "../../../common/constants/roles";

export class UserResponseDto {
    id!: number;
    email!: string;
    roles!: Role[];
    createdAt!: Date;
}
