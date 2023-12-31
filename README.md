# GigaChat Telegram bot

Удобный бот для телеграма с интеграцией GigaChat.

### Чем он хорош: 
- Вы САМИ создаете помощников для различной деятельности (блогинг, программирование, редактирование текста, маркетолога и тд)
- быстрый доступ к языковой модели прямо из телеграмма
- минимум настройки и легкое редактирование команд

# Что умеет проект
1) Удобный пользовательский интерфейс:
![start message](/images/4.png)
2) Адаптируется к вашим промптам сам:
![commands message](/images/6.png)
3) Отвечать используя ВАШИ промпты, пример с промптом "редактор текста":
![redactor prompt](/images/5.png)
4) Создавать смешных ботов чтобы посмеяться в чате с друзьями
![ded prompt](/images/7.png)

# Как запустить:
### Клонирование проекта
0) `git clone` + ссылка на проект
---
### Создание ключа GigaChat:
1) Заходим в [личный кабинет сбера для разработчиков](https://developers.sber.ru/studio/workspaces/) и регистрируемся
2) В левом меню нажимаем создать проект, в инструментах выбираем GigaChat API, проходим на следующие шаги создания (заполняем название проекта и т.п.)
3) Заходим в созданный проект
4) Генерируем ключ используя кнопку (не путать с ClientID):
![gigachat token generation button](/images/1.png) и сохраняем полученный ключ
5) Бесплатно дается 1000000  токенов (на одного человека хватит на очень долго), дальше можно докупить подписку

---
### Создание ключа Telegram бота
5) Перейдите в диалог с инструментом для разработки чатов — https://telegram.me/BotFather.
6) Нажмите кнопку «Start» или введите в диалоге команду /start.
7) Далее введите команду /newbot, чтобы сделать новый бот.
8) Укажите название — как будет отображаться чат в списке контактов.
9) Последнее — системное имя: это то, что будет ником после знака @.
10) После успешного создания вы получите токен:
![telegram token location](/images/2.png) и сохраняем полученный токен

---
### Инициализация проекта
11) Открываем склоненный проект в любом редакторе кода (или переходим в него через консоль `cd` + название папки)
12) Понадобится создать `.env` файл и вписать в него сохраненные ключи как в примере в файле `.env.example`
13) `npm install` для установки библиотек зависимостей
14) `npm run start` для запуска проекта

В случае успешного запуска в консоли будет написано:
![satrt application message](/images/3.png)
В случае неудачи в консоли отобразится причины ошибки

---
# Как пользоваться и добавлять своих ботов:
### Как начать общение
1) После запуска приложения нужно зайти в личные сообщения бота (или пригласить его в созданную группу или канал и дать права администратора, подробнее [здесь](https://botifi.me/ru/help/telegram-adding-bot-to-channel-or-group/))
2) Бот будет реагировать на заданные команды по умолчанию (/start, /help, /commands)
### Как добавить своих ботов
1) Нам нужен файл src/constants/prompts.ts
2) Нам нужен промпт, который мы хотим добавить, хорошие примеры [здесь](https://promptvibes.com)
3) В файле src/constants/prompts.ts создаем константу с текстом промпта (например, как RedactorPrompt)
4) Ниже добавляем в объект chatPrompts строчку в формате `команда: НазваниеПромпта`
5) Перезапускаем проект, больше ничего делать не нужно!

---
Планы на развитие:

- [ ] интегрировать БД для сохранения промптов и контекста
- [ ] возможность добавлять промпты непосредственно через телеграм бот
- [ ] ?добавить возможность интеграции с другими языковыми моделями?

