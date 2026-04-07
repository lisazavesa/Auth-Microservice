import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CryptoService } from "../../common/crypto.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { DEFAULT_ROLES, Role } from "../../common/constants/roles";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private crypto: CryptoService,
    ) {}

    async create(dto: CreateUserDto): Promise<UserResponseDto> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new ConflictException(
                "Пользователь с таким email уже существует",
            );
        }

        const passwordHash = await this.crypto.hash(dto.password);

        const roles =
            dto.roles && dto.roles.length > 0 ? dto.roles : DEFAULT_ROLES;

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash: passwordHash,
                roles: roles,
            },
        });

        return {
            id: user.id,
            email: user.email,
            roles: user.roles as Role[],
            createdAt: user.createdAt,
        };
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ 
            where: { email } 
        });
    }
}
