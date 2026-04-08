import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class TokenService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async generateTokens(
        userId: number,
        roles: string[],
    ): Promise<LoginResponseDto> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwt.signAsync(
                { sub: userId, roles },
                {
                    secret: this.config.get<string>("JWT_ACCESS_SECRET"),
                    expiresIn: "15m",
                    algorithm: "HS256",
                },
            ),
            this.jwt.signAsync(
                { sub: userId, type: "refresh" },
                {
                    secret: this.config.get<string>("JWT_REFRESH_SECRET"),
                    expiresIn: "30d",
                    algorithm: "HS256",
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
            expiresIn: 15 * 60,
        };
    }

    async verifyAccessToken(token: string) {
        return this.jwt.verifyAsync(token, {
            secret: this.config.get<string>("JWT_ACCESS_SECRET"),
            algorithms: ["HS256"],
        });
    }

    async verifyRefreshToken(token: string) {
        return this.jwt.verifyAsync(token, {
            secret: this.config.get<string>("JWT_REFRESH_SECRET"),
            algorithms: ["HS256"],
        });
    }
}
