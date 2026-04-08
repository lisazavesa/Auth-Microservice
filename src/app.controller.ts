import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("App")
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: "Проверка доступности сервиса" })
    @ApiOkResponse({
        description: "Сервис доступен",
        schema: { example: "Hello World!" },
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
