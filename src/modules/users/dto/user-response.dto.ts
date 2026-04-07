import { Role } from "../../../common/constants/roles";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({ example: 1, description: "ID пользователя" })
    id!: number;

    @ApiProperty({
        example: "user@example.com",
        description: "Email пользователя",
    })
    email!: string;

    @ApiProperty({
        isArray: true,
        example: ["USER"],
        description: "Роли пользователя",
    })
    roles!: Role[];

    @ApiProperty({
        example: "2026-04-07T12:00:00.000Z",
        description: "Дата создания",
    })
    createdAt!: Date;
}
