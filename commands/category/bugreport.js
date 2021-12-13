var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "bug",
    description: "invite link of bot",
    usage: "1) m/invite \n2) m/inv",
    aliases: ['i']
},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

   args = args.join(" ");
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    message.reply(
      "¡Gracias por enviar un error! , Pronto se revisara y se corregira."
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Pedido por: ${message.author.username}`
      })
      .then(InviteCode =>
        bot.channels.cache.get("883172404287901726").send(
          new Discord.MessageEmbed()
            .setTitle("Nuevo reporte")
            .addField(
              "Nombre del usuario:",
              `\`${message.author.username}#${message.author.discriminator}\``
            )
            .addField("ID del usuario:", `\`${message.author.id}\``)
            .addField("Reportado:", `\`${args}\``)
            .addField("Nombre del servidor:", `\`${message.guild.name}\``)
            .addField("ID del servidor:", `\`${message.guild.id}\``)
            .addField("Busqueda del usuario:", `**[Click Aqui](https://discordapp.com/users/${message.guild.id}/)**`)
            .addField(`Link del server:`, `https://discord.gg/${InviteCode.code}`)
            .setColor("RANDOM")
        )
      );
  }
};