
import pkg from 'whatsapp-web.js';
import { talk } from './session-based-chat.js';
import { imgRecognition } from './img-recognition.js';

const { Client, LocalAuth } = pkg;

const client = new Client(
    {
        puppeteer: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        authStrategy: new LocalAuth()
    }
);


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});


client.on('ready', async () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    let chat = await msg.getChat()
    if (chat.isGroup) return;

    let response = ""

    if (msg.hasMedia) {
        const media = await msg.downloadMedia()
        response = await imgRecognition(media.data)

    } else {
        response = await talk(msg.from, msg.body)
    }

    // const response = await talk(msg.from, msg.body)

    await client.sendMessage(msg.from, response)
});

client.on('media_uploaded', async (msg) => {
    console.log("Media uploaded")
    console.log(msg.body)

});

client.initialize()
