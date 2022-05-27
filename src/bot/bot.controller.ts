import {
    Controller,
    Get,
} from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private readonly userService: BotService) { }

    @Get()
    async Bot(): Promise<object> {

        const code = await this.userService.startBot('5380617566:AAGNYy2DvzbMRTdOtJazVhPv8I6dEclKTiI');

        const objJson1 = JSON.parse(JSON.stringify({
            botStarted: true,
            botId: '@test_1382_bot',
            code: code
        }));
        return objJson1;
    }
}

