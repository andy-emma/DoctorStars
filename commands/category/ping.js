var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "ping",
    description: "invite link of bot",
    usage: "1) m/ping \n2) m/inv",
    aliases: ['ping']
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

if(message.content.toLowerCase() === `${prefix}ping`){
    var log = new Discord.MessageEmbed()
    .setColor(`#dcf104`)
    .setAuthor(`${bot.user.username} `)
    .setThumbnail(bot.user.displayAvatarURL())   
    .addField("<a:Yes_DoS:892135170235334666> Latencia de API", Math.round(bot.ws.ping) + "ms", true)
    .setFooter(message.guild.name, message.guild.iconURL())
message.channel.send(log);
}
}
}