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
        private prisma: PrismaService,
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

        const tokens = await this.tokens.generateTokens(user.id, user.roles);

        const refreshTokenHash = await this.crypto.hash(tokens.refreshToken);

        const refreshToken = await this.prisma.refreshToken.create({
            data: {
                tokenHash: refreshTokenHash,
                userId: user.id,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });

        return tokens;
    }
}
