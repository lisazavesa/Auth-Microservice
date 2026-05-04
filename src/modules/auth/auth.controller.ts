import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RefreshTokenRequestDto } from "./dto/refresh-token-request.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Public } from "../../common/public.decorator";

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

    @Public()
    @Post("refresh")
    @ApiOperation({ summary: "Обновление токенов доступа" })
    @ApiBody({ type: RefreshTokenRequestDto })
    @ApiOkResponse({
        description: "Успешное обновление токенов",
        type: LoginResponseDto,
    })
    @ApiBadRequestResponse({ description: "Некорректные входные данные" })
    @ApiUnauthorizedResponse({
        description: "Refresh token истёк или недействителен",
    })
    refresh(@Body() dto: RefreshTokenRequestDto): Promise<LoginResponseDto> {
        return this.authService.refreshTokens(dto.refreshToken);
    }
}
