const startMessage = 'Привет! Вот доступные команды: '

const createResponseMessage = 'Делаю запрос'

const waitForAnswerMessage = 'Предыдущий запрос еще прошел, подожди очереди'

const exampleMessage = 'Чтобы обратиться к вашему боту, нужно прописать команду (чтобы посмотреть доступные нужно ввести /commands) и ваше сообщение. \n  Пример: /redactor Отредактируй сообщение: Привет! Хочу пригласить тебя на ужин!'

const availableCommandsMessage = 'Доступные команды'

const messageWasEditedMessage = 'Я пока не умею распознавать изменения текста, напиши заново'

const helpMessage = "Помощь: '/commands', '/example', '/help'"

const startVKMessage = 'Привет! Версия чата: 0.2, чтобы узнать доступные команды и доступных ботов пиши /help'

export const messages = {
  start: startMessage,
  createResponse: createResponseMessage,
  waitForAnswer: waitForAnswerMessage,
  example: exampleMessage,
  availableCommands: availableCommandsMessage,
  messageWasEdited: messageWasEditedMessage,
  help: helpMessage,
  startVK: startVKMessage
}
