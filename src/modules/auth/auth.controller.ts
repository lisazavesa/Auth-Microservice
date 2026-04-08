import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    @ApiOperation({ summary: "Вход пользователя" })
    @ApiBody({ type: LoginRequestDto })
    @ApiOkResponse({
        description: "Успешная авторизация",
        type: LoginResponseDto,
    })
    @ApiBadRequestResponse({ description: "Некорректные входные данные" })
    login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authService.login(dto);
    }
}
