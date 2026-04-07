import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UsersService } from "./users.service";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: "Создание нового пользователя" })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({
        description: "Пользователь успешно создан",
        type: UserResponseDto,
    })
    @ApiBadRequestResponse({ description: "Некорректные входные данные" })
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.usersService.create(createUserDto);
    }
}
