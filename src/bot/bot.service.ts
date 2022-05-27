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


    async startBot(token: string) {
        const code = this.createToken()
        const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        const bot = new Telegraf(String(token));
        bot.start((ctx) => {
            ctx.reply('سلام لطفا ایمیل');

            bot.email(regex, (ctx) => {
                const email = ctx.message['text'];
                ctx.reply('لطفا کد ارسال شده به ایمیل را وارد کنید')

                bot.hears(code, (ctx) => {
                    ctx.reply('کد دریافتی با موفقیت ثبت شد')
                    const user = { email, first_name: ctx.from.first_name, last_name: ctx.from.last_name, chat_id: String(ctx.from.id) };
                    this.createBotUser(user);
                    bot.telegram.sendMessage(ctx.chat.id, `خوش آمدید اقای/خانوم ${user.first_name} \n کد دریافتی با موفقیت ثبت شد`, {
                        reply_markup: {
                            inline_keyboard: this.keyboard()
                        }
                    })
                })
            });

        });

        bot.help((ctx) => ctx.reply('Send me a sticker'));
        bot.hears('hi', (ctx) => ctx.reply('Hey there'));
        bot.launch();
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
        return code;
    }


    createToken(): string {
        return uuidv4();
    }


    async createBotUser(body: CreateBotUserDto): Promise<void> {
        const newUser: botUser = await this.userRepository.create(body);
        await this.userRepository.save(newUser);
    }


    keyboard() {
        return [
            [
                { text: "اطلاعات کاربری", callback_data: 'TENDER' },
                { text: "احراز هویت", callback_data: 'VACANCY' }
            ],

            [
                { text: "خرید و فروش", callback_data: 'hello' },
                { text: "قیمت ارز", callback_data: 'bye' }
            ],

            [
                { text: "لیست ارز", callback_data: 'god' }
            ],
        ]
    }
}
