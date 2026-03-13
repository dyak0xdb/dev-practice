## Mini Node.js Script

A small Node.js script that allows you to select a Twitter account and automatically forward tweets to your Telegram channel using a cron job.

### Install required modules

```bash
npm install rss-parser
npm install node-telegram-bot-api
````

> Note: `fs` is a built-in Node.js module, no need to install it separately.

### Set up a cron job

Open crontab:

```bash
crontab -e
```

Add the following line to run the script every hour:

```bash
0 * * * * /usr/bin/node /root/code/dev.js >> /root/code/dev.log 2>&1
```

This will execute the script at the start of every hour and log output to `dev.log`.

```bash
cat /root/code/dev.log
```
