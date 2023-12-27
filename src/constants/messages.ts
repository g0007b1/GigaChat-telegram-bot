const startMessage = 'Привет! Вот доступные команды: '

const createResponseMessage = 'Делаю запрос'

const waitForAnswerMessage = 'Предыдущий запрос еще прошел, подожди очереди'

const exampleMessage = 'Чтобы обратиться к вашему боту, нужно прописать команду (чтобы посмотреть доступные нужно ввести /commands) и ваше сообщение. \n  Пример: /redactor Отредактируй сообщение: Привет! Хочу пригласить тебя на ужин!'

const availableCommandsMessage = 'Доступные команды'

export const messages = {
  start: startMessage,
  createResponse: createResponseMessage,
  waitForAnswer: waitForAnswerMessage,
  example: exampleMessage,
  availableCommands: availableCommandsMessage
}
