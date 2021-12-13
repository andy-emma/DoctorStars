var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "invite",
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

if(message.content.toLowerCase() === `${prefix}invite`){
    var log = new Discord.MessageEmbed()
    .setColor(`#dcf104`)
    .setAuthor(`${bot.user.username} bot`)
      .setThumbnail(bot.user.displayAvatarURL())   
    .setDescription(` <a:Raya_DoS:913961723243954206> [**HAGA CLIC AQUÍ PARA INVITARME**](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)
    <a:Raya_DoS:913961723243954206> Servidor de soporte:[Click Aqui](https://discord.gg/8THsUaBAQF) `,true)

message.channel.send(log);
}
}
}