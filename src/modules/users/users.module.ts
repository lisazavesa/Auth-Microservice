import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaModule } from "../../prisma/prisma.module";
import { CommonModule } from "../../common/common.module";

@Module({
    imports: [PrismaModule, CommonModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
