const TelegramBot = require("node-telegram-bot-api");

const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const bot = new TelegramBot("BOT_TOKEN", { polling: false });

bot.sendMessage(`@CHANEL_NAME`, `tst`)
, { parse_mode: "HTML" }, { disable_web_page_preview: false }
  .then(() => console.log("Done"))
  .catch(console.error);
