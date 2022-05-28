import { Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BotService } from './bot.service';

@ApiTags('bot')
@ApiResponse({ status: 200, description: 'bot started succesfully' })
@Controller('bot')
export class BotController {
  constructor(private readonly userService: BotService) {}

  @Get()
  async Bot(): Promise<object> {
    // this.userService.startBot();
    // const objJson1: Object = JSON.parse(JSON.stringify({
    //     botStarted: true,
    //     botId: '@test_1382_bot'
    // }));
    // return objJson1;

    const responseJson: Object = JSON.parse(
      JSON.stringify({
        botStarted: this.userService.startBot(),
        botId: '@test_1382_bot',
      }),
    );
    return responseJson;
  }
}
