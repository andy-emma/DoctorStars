const { MessageEmbed } = require("discord.js");
const config = require("../../config");
const nekos = require("nekos.life");
const {
  sfw: { kiss, slap },
} = new nekos();

module.exports = {
  config: {
    name: "kiss",
    description: "Get's a kiss reaction!",
    aliases: ["KISS", "Kiss"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    const embed = new MessageEmbed();

    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      const { url } = await slap().catch(() => {});

      if (!url) return message.channel.send(`No se pudo conectar a nekos.life`);

      return message.channel.send(
        embed
          .setColor("YELLOW")
          .setDescription(`${message.member}, ¡Cómo te atreves!`)
          .setImage(url)
          .setFooter(
            `${message.member.displayName}, Realmente te mereces una bofetada.`
          )
      );
    } else {
      const { url } = await kiss().catch(() => {});

      if (!url) return message.channel.send(`No se pudo conectar a nekos.life`);

      if (
        message.mentions.members.size &&
        message.mentions.members.first().id === message.author.id
      ) {
        return message.channel.send(`S~seriamente!`);
      } else if (message.mentions.members.size) {
        return message.channel.send(
          embed
            .setColor("YELLOW")
            .setDescription(
              `${message.member} beso ${message.mentions.members.first()}!`
            )
            .setImage(url)
        );
      } else {
        return message.channel.send(
          `Perdon ${message.member}, Parece que no puedo localizar a tu amigo imaginario.`
        );
      }
    }
  },
};
