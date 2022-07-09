const Discord = require("discord.js");
const bot = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
const fs = require("fs");
require("dotenv").config();

bot.on("ready", () => {
  console.log(`${bot.user.tag}`);
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdirSync(`Commands/`).forEach((dir) => {
  const Filter = fs
    .readdirSync(`Commands/${dir}`)
    .filter((f) => f.endsWith(".js"));

  console.log(Filter);

  Filter.forEach((file) => {
    const cmd = require(`./Commands/${dir}/${file}`);

    bot.commands.set(cmd.config.name, cmd);

    for (let alias of cmd.config.aliases) {
      bot.aliases.set(alias, cmd.config.name);
    }
  });
});

function runCommand(command, message, args, PREFIX) {
  const cmd = bot.commands.get(command)
    ? bot.commands.get(command)
    : bot.commands.get(bot.aliases.get(command));

  if (cmd) cmd.run(bot, message, args, PREFIX);

  return;
}

bot.on("message", async (msg) => {
  const PREFIX = "TEST";

  if (!msg.content.startsWith(PREFIX)) return;

  let args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  try {
    runCommand(command, msg, args, PREFIX);
  } catch (err) {
    console.error(err);
  }
});

bot.login(process.env.BOT_TOKEN);
