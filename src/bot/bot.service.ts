import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telegraf } from 'telegraf';
import { Repository } from 'typeorm';
import { CreateBotUserDto } from './bot.dto';
import { botUser } from './bot.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BotService {
    constructor(@InjectRepository(botUser) private userRepository: Repository<botUser>) { }

    async createUser(body: CreateBotUserDto): Promise<void> {
        const newUser: botUser = await this.userRepository.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            chat_id: body.chat_id,
        });
        await this.userRepository.save(newUser);
    }

    async startBot(token: string, callback: Function) {
        const bot = new Telegraf(String(token));
        bot.start((ctx) => callback(bot));
        bot.help((ctx) => ctx.reply('Send me a sticker'));
        bot.hears('hi', (ctx) => ctx.reply('Hey there'));
        bot.launch();
        // Enable graceful stop
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
        // return callback(bot);
    }

    async createToken(): Promise<string> {
        return uuidv4();
    }
}
