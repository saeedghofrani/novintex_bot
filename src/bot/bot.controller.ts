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
        
        this.userService.startBot('5380617566:AAGNYy2DvzbMRTdOtJazVhPv8I6dEclKTiI');

        const objJson1 = JSON.parse(JSON.stringify({
            botStarted: true,
            botId: '@test_1382_bot'
        }));
        return objJson1;
    }
}

