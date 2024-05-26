import GigaChat from 'gigachat-node'
import { chatPrompts } from '../constants/prompts'
import { type Context, Telegraf, Markup } from 'telegraf'
import { messages } from '../constants/messages'
import VkBot from 'node-vk-bot-api'

interface ConstructorType {
  secretTokenGigaChat: string
  messengerType: 'VK' | 'TG'
  secretTokenVK: string
  secretTokenTelegram: string
}

export class GigaTgBotClass {
  secretTokenGigaChat: string
  secretTokenTelegram: string
  secretTokenVK: string
  messengerType: string
  client: any
  loadingResponse: boolean = false
  startedWithNoContext: boolean = false

  constructor (args: ConstructorType) {
    this.secretTokenGigaChat = args.secretTokenGigaChat
    this.secretTokenTelegram = args.secretTokenTelegram
    this.secretTokenVK = args.secretTokenVK
    this.messengerType = args.messengerType
  }

  async startBot (): Promise<void> {
    await this.createGigaChatClient()
    setTimeout(() => { this.startedWithNoContext = true }, 10000)
    switch (this.messengerType) {
      case 'VK':
        await this.createVkBotClient()
        break
      case 'TG':
        await this.createTelegramClient()
        break
      default:
        break
    }
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

  async createVkBotClient (): Promise<void> {
    const bot = new VkBot(this.secretTokenVK)

    bot.startPolling()

    bot.command('/start', (ctx) => {
      if (this.startedWithNoContext) { ctx.reply(messages.startVK) }
    }
    )

    bot.command('/help', async ctx => {
      if (this.startedWithNoContext) { ctx.reply(messages.help) }
    })

    bot.command('/commands', async ctx => {
      if (this.startedWithNoContext) {
        ctx.reply(
        `${messages.availableCommands}: ${'/' + Object.keys(chatPrompts).join(', /')}`
        )
      }
    }
    )

    Object.keys(chatPrompts).forEach(commandName => {
      bot.command(`/${commandName}`, async (ctx) => {
        if (!this.loadingResponse && this.startedWithNoContext) {
          await this.createAnswerVK(ctx.message.text ? ctx.message.text.slice(commandName.length + 1) : '', ctx, commandName as keyof typeof chatPrompts)
        } else {
          if (this.startedWithNoContext) { ctx.reply(messages.waitForAnswer) }
        }
      })
    })
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

  async createAnswerVK (message: string, ctx: VkBotContext, name: keyof typeof chatPrompts): Promise<void> {
    ctx.reply(messages.createResponse)
    this.loadingResponse = true

    const response = await this.client.completion({
      model: 'GigaChat:latest',
      messages: [
        {
          role: 'system',
          content: chatPrompts[name]
        },
        {
          role: 'user',
          content: message
        }
      ]
    })

    ctx.reply(response.choices[0].message.content as string)
    this.loadingResponse = false
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
