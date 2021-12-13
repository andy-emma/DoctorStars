const { MessageEmbed } = require("discord.js");
const config = require("../../config");
const nekos = require("nekos.life");
const {
  sfw: { slap },
} = new nekos();
module.exports = {
  config: {
    name: "slap",
    description: "Get's a slap reaction!",
    aliases: ["SLAP", "Slap"],
    usage: "<user>",
    accessableby: "",
  },
  run: async (client, message, args) => {
    const { url } = await slap().catch(() => {});

    if (!url) return message.channel.send(`No se pudo conectar a nekos.life`);

    const embed = new MessageEmbed();

    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      return message.channel.send(
        `${
          [`¡Ay! ¡Cómo te atreves a darme una bofetada! `,` ¡Basta! `,` ¡Me duele! ; -;`][
            Math.floor(Math.random() * 2)
          ]
        }`
      );
    } else if (
      message.mentions.members.size &&
      message.mentions.members.first().id === message.author.id
    ) {
      return message.channel.send(`Wai~ En serio!?`);
    } else if (message.mentions.members.size) {
      return message.channel.send(
        embed
          .setColor("YELLOW")
          .setDescription(
            `${message.member} slapped ${message.mentions.members.first()}!`
          )
          .setImage(url)
      );
    } else {
      return message.channel.send(
        `${message.member}, estás practicando para dar una bofetada o algo así?`
      );
    }
  },
};
