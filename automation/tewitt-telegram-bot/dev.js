const Parser = require("rss-parser");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");

const parser = new Parser({ timeout: 10000 });

const file = "lastTweet.txt";

const TOKEN = "Bot_Token";
const bot = new TelegramBot(TOKEN, { polling: false });
const channel = "@Channel_Name_Name";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    const feed = await parser.parseURL("https://nitter.net/elonmusk/rss");

    if (!feed.items || feed.items.length === 0) {
        console.log("No items found.");
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
            const cleanTitle = tweet.title.replace(/^R to @\w+:\s*/, '');
            const text = `<b>${cleanTitle}</b>`;
            try {
                await bot.sendMessage(channel, text, {
                    parse_mode: "HTML",
                    disable_web_page_preview: true
                });
                await sleep(1500);
            } catch (err) {
                console.error("Telegram error:", err.message);
            }
        }

        const latestId = feed.items[0].guid || feed.items[0].link;
        fs.writeFileSync(file, latestId);

        console.log(`Sent ${newTweets.length} new tweets. ${new Date().toLocaleString()}`);
    } else {
        console.log(`No new tweets. ${new Date().toLocaleString()}`);
    }
}

async function runWithRetry(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await run();
            return; 
        } catch (err) {
            const status = err.status || err.statusCode;
            console.log(`Error attempt ${i + 1}:`, status || err.message);

            if (status === 429) {
                console.log("Rate limit hit, waiting 30s...");
                await sleep(30000);
            } else if (status === 404) {
                console.log("Feed not found, retrying in 10s...");
                await sleep(30000);
            } else {
                console.log("Unknown error, retrying in 5s...");
                await sleep(5000);
            }
        }
    }
    console.log("Max retries reached. Skipping...");
}

runWithRetry().then(() => {
    process.exit(0);
});
