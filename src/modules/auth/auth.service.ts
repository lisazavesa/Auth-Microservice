import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CryptoService } from "../../common/crypto.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { UsersService } from "../users/users.service";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private crypto: CryptoService,
        private tokens: TokenService,
    ) {}

    async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.users.findByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException("Неверный email или пароль");
        }

        const isPasswordValid = await this.crypto.verify(
            dto.password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException("Неверный email или пароль");
        }

        return this.tokens.generateTokens(user.id, user.roles as string[]);
    }
}
