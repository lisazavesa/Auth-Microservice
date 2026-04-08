import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
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
}
