import GigaChat from 'gigachat-node'
import { chatPrompts } from '../constants/prompts'
import { type Context, Telegraf, Markup } from 'telegraf'
import { messages } from '../constants/messages'

export class GigaTgBotClass {
  secretTokenGigaChat: string
  secretTokenTelegram: string
  client: any
  loadingResponse: boolean = false

  constructor (secretTokenGigaChat: string, secretTokenTelegram: string) {
    this.secretTokenGigaChat = secretTokenGigaChat
    this.secretTokenTelegram = secretTokenTelegram
  }

  async startBot (): Promise<void> {
    await this.createGigaChatClient()
    await this.createTelegramClient()
  }

  async createGigaChatClient (): Promise<void> {
    const client = new GigaChat(
      this.secretTokenGigaChat,
      true,
      true
    )
    await client.createToken()
    this.client = client
  }

  async createTelegramClient (): Promise<void> {
    const bot = new Telegraf(this.secretTokenTelegram)

    bot.start(async (ctx) => {
      await ctx.reply(messages.start, Markup.keyboard(['/commands', '/example', '/help']).oneTime().resize())
    })

    bot.action('delete', async ctx => await ctx.deleteMessage())

    bot.command('help', async ctx => {
      await ctx.reply(
        'Помощь: ',
        Markup.keyboard(['/commands', '/example', '/help']).oneTime().resize()
      )
    })

    Object.keys(chatPrompts).forEach(commandName => {
      bot.command(commandName, async (ctx) => {
        if (!this.loadingResponse) {
          await this.createAnswer(ctx.message.text.slice(commandName.length + 1), ctx, commandName as keyof typeof chatPrompts)
        } else {
          await ctx.reply(messages.waitForAnswer)
        }
      })
    })

    bot.command('example', async ctx => {
      await ctx.reply(messages.example)
    })

    bot.command('commands', async ctx =>
      await ctx.reply(
        `${messages.availableCommands}: ${'/' + Object.keys(chatPrompts).join(', /')}`
      )
    )

    await bot.launch()

    process.once('SIGINT', () => { bot.stop('SIGINT') })
    process.once('SIGTERM', () => { bot.stop('SIGTERM') })
  }

  async createAnswer (message: string, ctx: Context, name: keyof typeof chatPrompts): Promise<void> {
    await ctx.reply(messages.createResponse)
    this.loadingResponse = true

    const response = await this.client.completion({
      model: 'GigaChat:latest',
      messages: [
        {
          role: 'user',
          content: chatPrompts[name]
        },
        {
          role: 'user',
          content: message
        }
      ]
    })

    await ctx.reply(response.choices[0].message.content as string)
    this.loadingResponse = false
  }
}
