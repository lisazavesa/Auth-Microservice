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

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsIn(Object.values(ROLES), { each: true, message: "Неверная роль" })
    roles?: Role[];
}
