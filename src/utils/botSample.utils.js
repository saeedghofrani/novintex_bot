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







