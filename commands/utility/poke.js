const { MessageEmbed } = require("discord.js");
const config = require("../../config");
const nekos = require("nekos.life");
const {
  sfw: { poke },
} = new nekos();

module.exports = {
  config: {
    name: "poke",
    description: "Get's a poke reaction!",
    aliases: ["POKE", "Poke"],
    usage: "<user>",
    accessableby: "",
  },
  run: async (client, message, args) => {
    const { url } = await poke().catch(() => {});

    if (!url) return message.channel.send(`No se pudo conectar a nekos.life`);

    const embed = new MessageEmbed();

    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      return message.channel.send(
        `${message.member}, ¡Ya estoy aquí! ¿Necesitas algo?`
      );
    } else if (
      message.mentions.members.size &&
      message.mentions.members.first().id === message.author.id
    ) {
      return message.channel.send(`¿Que?`);
    } else if (message.mentions.members.size) {
      return message.channel.send(
        embed
          .setColor("YELLOW")
          .setDescription(
            `${message.member} pokes ${message.mentions.members.first()}!`
          )
          .setImage(url)
      );
    } else {
      return message.channel.send(
        `${message.member},¡No puedo pinchar a tu amigo imaginario! :(`
      );
    }
  },
};