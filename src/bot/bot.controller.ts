import {
    Controller,
    Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BotService } from './bot.service';

@ApiTags('bot')
@ApiResponse({status: 200, description: 'bot started succesfully'})
@Controller('bot')
export class BotController {
    constructor(private readonly userService: BotService) { }

    @Post()
    async Bot(): Promise<object> {

        const code: string = this.userService.startBot();


        const objJson1: Object = JSON.parse(JSON.stringify({
            botStarted: true,
            botId: '@test_1382_bot',
            code: code
        }));
        return objJson1;
    }
}