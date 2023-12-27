import { GigaTgBotClass } from './classes/gigaTgBotClass'
import 'dotenv/config'

const secretTokenGigaChat = process.env.SECRET_GIGACHAT_KEY ?? ''
const secretTokenTelegram = process.env.TELEGRAM_BOT_KEY ?? ''

if (secretTokenGigaChat && secretTokenTelegram) {
  const GigaChat = new GigaTgBotClass(
    secretTokenGigaChat,
    secretTokenTelegram)

  GigaChat.startBot()

  console.log('Бот успешно запущен!')
} else {
  console.log('Не введены токены, запишите их в .env файл и запустите снова')
}
