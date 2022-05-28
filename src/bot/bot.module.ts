import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { botUser } from './bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([botUser])],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}
