import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    IsIn,
    MinLength,
} from "class-validator";
import { ROLES, Role } from "../../../common/constants/roles";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: "user@example.com",
        description: "Email пользователя",
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        minLength: 6,
        example: "strongPassword123",
        description: "Пароль пользователя",
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;

    @ApiPropertyOptional({
        isArray: true,
        enum: ROLES,
        example: [ROLES.USER],
        description: "Роли пользователя",
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsIn(Object.values(ROLES), { each: true, message: "Неверная роль" })
    roles?: Role[];
}
