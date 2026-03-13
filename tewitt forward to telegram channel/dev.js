const Parser = require("rss-parser");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");

const parser = new Parser();
const file = "lastTweet.txt";

const TOKEN = "8678044978:AAHlqXdP7hD3mcgaQMTq90FiUpVnfYIAQdI";
const bot = new TelegramBot(TOKEN, {
    polling: false
});
const channel = "@IRBreakingNewss";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    try {
        const feed = await parser.parseURL("https://nitter.net/IranIntlbrk/rss");

        if (!feed.items || feed.items.length === 0) {
            console.log("No items found in the feed.");
            return;
        }

        let lastId = "";
        if (fs.existsSync(file)) {
            lastId = fs.readFileSync(file, "utf8").trim();
        }

        let newTweets = [];
        for (const tweet of feed.items) {
            const currentId = tweet.guid || tweet.link;
            if (currentId === lastId) break;
            newTweets.push(tweet);
        }

        if (newTweets.length > 0) {
            newTweets.reverse();

            for (const tweet of newTweets) {
                const text = `<b>${tweet.title}</b>\n\n<a href="${tweet.link}">tweet</a>`;
                try {
                    await bot.sendMessage(channel, text, {
                        parse_mode: "HTML",
                        disable_web_page_preview: true
                    });
                    await sleep(1000);
                } catch (sendError) {
                    console.error("Telegram API Error:", sendError.message);
                }
            }

            const latestId = feed.items[0].guid || feed.items[0].link;
            fs.writeFileSync(file, latestId);
            console.log(`Successfully sent ${newTweets.length} new tweet.`);
        } else {
            console.log(`Everything is up to date. No new tweets.\n${new Date().toLocaleString()}`);
        }

    } catch (err) {
        if (err.status === 429 || err.statusCode === 429) {
            setInterval(run, 10000);
        } else {
            console.error("RSS Fetching Error:", err.message);
        }
    }
}

run();
