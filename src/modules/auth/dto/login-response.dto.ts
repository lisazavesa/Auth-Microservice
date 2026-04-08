import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({
        description: "JWT access token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    })
    @IsString()
    accessToken!: string;

    @ApiProperty({
        description: "Refresh token",
        example: "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4=",
    })
    @IsString()
    refreshToken!: string;

    @ApiProperty({
        description: "Срок действия access token в секундах",
        example: 900,
    })
    @IsNumber()
    expiresIn!: number;
}
