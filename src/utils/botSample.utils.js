const { Telegraf } = require('telegraf')
// const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const bot = new Telegraf('5380617566:AAGNYy2DvzbMRTdOtJazVhPv8I6dEclKTiI')
bot.start((ctx) => {
    const database = [];
    ctx.reply('سلام لطفا ایمیل')
    bot.email((ctx) => {
        const email = ctx.message.text
        ctx.reply('لطفا کد ارسال شده به ایمیل را وارد کنید')
        const code = uuidv4();
        console.log(code);
        // let mailTransporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'hajsaeed82@gmail.com', pass: 'mr.saeed2002' } });
        // let mailDetails = {
        //     from: 'hajsaeed82@gmail.com',
        //     to: 'sa.ghofraniivari@gmail.com',
        //     subject: 'Test mail',
        //     text: 'Node.js testing mail for GeeksforGeeks'
        // };
        // mailTransporter.sendMail(mailDetails, function (err, data) {
        //     if (err) console.log('Error Occurs' + err);
        //     else console.log('Email sent successfully');
        // });
        bot.hears(code, (ctx) => {
            ctx.reply('کد دریافتی با موفقیت ثبت شد')
            const user = {}
            user.email = email;
            user.firstName = ctx.from.first_name;
            user.lastName = ctx.from.last_name;
            user.id = ctx.from.id;
            database.push(user);
            console.log(database);

            bot.telegram.sendMessage(ctx.chat.id, `خوش آمدید اقای/خانوم ${user.firstName} \n کد دریافتی با موفقیت ثبت شد`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "اطلاعات کاربری", callback_data: 'userInfo' },
                            { text: "احراز هویت", callback_data: 'identify' }
                        ],

                        [
                            { text: "خرید و فروش", callback_data: 'buySell' },
                            { text: "قیمت ارز", callback_data: 'price' }
                        ],

                        [
                            { text: "لیست ارز", callback_data: 'list' }
                        ],
                    ]
                }
            })
        })
        // bot.use(async (ctx, next) => {
        //     ctx.reply('کد وارد شده اشتباه است')
        //     await next()
        // })

    })
    // bot.use(async (ctx, next) => {
    //     ctx.reply('لطفا ایمیل درست را وارد کنید')
    //     await next()
    // })
})
console.log(bot);
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))



            // const uuidV4Regex = new RegExp(/^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i);
            // if ((!regex.test(ctx.message['text'])) && (ctx.message['text'] !== '/start')) {
            //     ctx.reply('ایمیل وارد شده معتبر نیست');
            //     return;
            // }
            // bot.use(async (ctx, next) => {

            //     if (!uuidV4Regex.test(ctx.message['text'])) {
            //         ctx.reply('کد وارد شده اشتباه است');
            //         await next();
            //         return;
            //     } 
            //         await next();
            // });

            // bot.on('callback_query', async (ctx) => {
            //     ctx.reply(`Your answer was: ${ctx.update.callback_query.data}`);
            //    })


            
    // checkInput(text, ctx) {
    //     const uuidV4Regex: RegExp = new RegExp(/^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i);
    //     if ((!uuidV4Regex.test(text))) {
    //         ctx.reply('ایمیل وارد شده معتبر نیست');
    //         return;
    //     }
    // }




    // @Get('/msg')
    // message(): void {
    //     this.userService.sendMessage('sadasd', 'asdasad');
    // }


    // sendMessage(chatId: string, message: string) {
    //     const bot: Telegraf<Context<Update>> = new Telegraf(this.config.get<string>('TELEGRAM_TOKEN_DEV') as string);
    //     bot.telegram.sendMessage(chatId, message);
    // }