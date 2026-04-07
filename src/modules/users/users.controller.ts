import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger"; // Если используешь Swagger

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: "Создание нового пользователя" })
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.usersService.create(createUserDto);
    }
}
