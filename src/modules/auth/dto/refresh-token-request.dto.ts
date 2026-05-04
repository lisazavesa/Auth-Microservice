import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenRequestDto {
    @ApiProperty({
        example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjY2OjEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcxNDkwNjUwNSwiZXhwIjoxNzE0OTA2NTA1fQ.XYZ...",
        description: "Refresh token для получения новой пары токенов",
    })
    @IsString()
    @IsNotEmpty()
    refreshToken!: string;
}
