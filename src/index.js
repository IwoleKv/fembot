const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
} = require(`discord.js`);

const prefix = ">";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

require("dotenv").config();

client.on("ready", () => {
  console.log("Online");
  client.user.setActivity(`Testowane jest`, { type: "gówno" });
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];
  const member = message.mentions.members.first() || message.member;

  if (command === `ping`) {
    message.channel.send("pong");
  }

  if (command === `p`) {

    const exampleEmbed = {
      color: 0xff0059,
      title: `${member.user.tag}`,
      author: {
        name: "autorTEST",
        icon_url: "https://i.imgur.com/RcScLqU.png",
        url: "https://i.imgur.com/RcScLqU.png",
      },
      description: `${member}`,
      thumbnail: {
        url: "https://i.imgur.com/RcScLqU.png",
      },
      image: {
        url: "https://i.imgur.com/RcScLqU.png",
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: message.author.username,
        icon_url: message.author.avatarURL(),
      },
    };

    message.channel.send({ embeds: [exampleEmbed] });
    message.channel.send(`1: ${member}`)
    message.channel.send(`2: ${args}`)
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
