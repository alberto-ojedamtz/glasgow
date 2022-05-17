import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();

const app = express();
const client = axios.create();

async function setTelegramWebhook() {
    try {
        const telegramBotUrl = process.env.TELEGRAM_API_URL + process.env.TELEGRAM_TOKEN;
        const webhookUrl = `${ process.env.SERVER_URL }/webhook/${ process.env.TELEGRAM_TOKEN }`;
        const url = `${ telegramBotUrl }/setWebhook?url=${ webhookUrl }`;

        const res = await client.get(url);
        console.log(`Telegram webhook successfully set, answered with: '${ res.data.description }'`);
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
    }
}

async function init() {
    await setTelegramWebhook();

    app.listen(5000, async() => {
        console.log(`app running on port 5000`);
    });
}

init();