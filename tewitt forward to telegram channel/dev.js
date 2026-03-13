const Parser = require("rss-parser");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");

const parser = new Parser();
const file = "lastTweet.txt";

const bot = new TelegramBot("8678044978:AAHlqXdP7hD3mcgaQMTq90FiUpVnfYIAQdI", { polling: false });
const channel = "@zj_news"; 

async function run() {
  try {
    const feed = await parser.parseURL(
      "https://nitter.net/IranIntlbrk/rss"
    );

    let lastId = "";
    if (fs.existsSync(file)) {
      lastId = fs.readFileSync(file, "utf8");
    }

    let newTweets = [];
    for (const tweet of feed.items) {
      if (tweet.id === lastId) break;
      newTweets.push(tweet);
    }

    newTweets.reverse();

for (const tweet of newTweets) {
  const now = new Date();
  const text = `${tweet.title}\n`;
  await bot.sendMessage(channel, text);
}
console.log("Number of tweets:", feed.items.length);

    if (feed.items.length > 0) {
      fs.writeFileSync(file, feed.items[0].id);
    }

  } catch (err) {
    console.error("Error:", err.message);
  }
}
run();
