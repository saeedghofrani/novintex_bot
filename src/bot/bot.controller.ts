import {
    Controller,
    Get,
} from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private readonly userService: BotService) { }

    @Get()
    async Bot(): Promise<string> {
        this.userService.startBot('5380617566:AAGNYy2DvzbMRTdOtJazVhPv8I6dEclKTiI', (bot) => {
            console.log(bot);

            // bot.reply('ssssssssss');
        })
        return 'Hello World!';
    }
}

