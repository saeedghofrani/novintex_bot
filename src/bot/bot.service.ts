import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBotUserDto } from './bot.dto';
import { botUser } from './bot.entity';
import { v4 as uuidv4 } from 'uuid';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotService {
    constructor(@InjectRepository(botUser) private userRepository: Repository<botUser>) { }
    @Inject(ConfigService)
    private readonly config: ConfigService;


    async createUser(body: CreateBotUserDto): Promise<void> {
        const newUser: botUser = await this.userRepository.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            chat_id: body.chat_id,
        });
        await this.userRepository.save(newUser);
    }


    startBot(token: string = this.config.get<string>('TELEGRAM_TOKEN_DEV')) {
        const code: string = this.createToken();
        const regex: RegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const bot: Telegraf<Context<Update>> = new Telegraf(token as string);

        bot.start((ctx) => {
            ctx.reply(' سلام وقت شما بخیر لطفا ایمیل خود را وارد کنید');
            console.log(typeof ctx)
            bot.email(regex, (ctx) => {

                const email = ctx.message['text'];
                ctx.reply('لطفا کد ارسال شده به ایمیل را وارد کنید')

                bot.hears(code, (ctx) => {
                    const user = { email, first_name: ctx.from.first_name, last_name: ctx.from.last_name, chat_id: String(ctx.from.id) };
                    this.createBotUser(user);
                    bot.telegram.sendMessage(ctx.chat.id, `خوش آمدید اقای/خانوم ${user.first_name} \n کد دریافتی با موفقیت ثبت شد`, {
                        reply_markup: {
                            inline_keyboard: this.keyboard()
                        }
                    });
                });
            });
        });

        bot.help((ctx) => ctx.reply('Send me a sticker'))
        .hears('hi', (ctx) => ctx.reply('Hey there'))
        .launch();
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
                { text: "اطلاعات کاربری", callback_data: 'userInfo' },
                { text: "احراز هویت", callback_data: 'identify' }
            ],

            [
                { text: "خرید و فروش", callback_data: 'sellBuy' },
                { text: "قیمت ارز", callback_data: 'price' }
            ],

            [
                { text: "لیست ارز", callback_data: 'list' }
            ],
        ]
    }
}
