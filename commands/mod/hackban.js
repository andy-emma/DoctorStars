const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
    config: {
        name: "hackban",
        aliases: ['forceban'],
        usage: "[hackban || forceban] <user ID>",
    },

    run: async(bot, message, args) => {
        const target = args[0];
        if (isNaN(target)) return message.reply(`Please specify an ID`);

        const reason   = args.splice(1, args.length).join(' ');

            try {
                message.guild.members.ban(target, {reason: reason.length < 1 ? 'No se proporcionó ninguna razón.': reason});
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("**Fueron prohibidos con éxito. ¡El usuario no fue notificado!**");
                await message.channel.send(embed2);                
                const channel  = db.fetch(`modlog_${message.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderacion**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Baneado por**", message.author.username)
                .addField("**Rason**", `${reason || "**Ninguna Rason**"}`)
                .addField("**Fecha**", message.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
            
            } catch (error) { console.log(error)}
    }
} 