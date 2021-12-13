
  
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
       
       const e1 =  new MessageEmbed()

       .setDescription(`**¡No tienes los permisos para prohibir usuarios! - [BANEAR_MIEMBROS]**`)
      .setColor("YELLOW")

        const e2 =  new MessageEmbed()

       .setDescription(`Proporcione un usuario para prohibir`)
      
       .setColor("YELLOW")

       const e3 =  new MessageEmbed()

       .setDescription(`El usuario no está en el gremio`)
      
       .setColor("YELLOW")

       const e4 =  new MessageEmbed()

       .setDescription(`No puedes prohibirte a ti mismo`)
      
       .setColor("YELLOW")

       const e5 =  new MessageEmbed()

       .setDescription(`No puedo prohibir a ese usuario`)
      
       .setColor("YELLOW")
       
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) 
            
            return message.channel.send("");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(e1);
            if (!args[0]) return message.channel.send(e2)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send(e3);
            if (banMember === message.member) return message.channel.send(e4)

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send(e5)
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**Hola, te han prohibido de ${message.guild.name} - ${reason || "Ninguna Rason"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** Ha sido prohibido por ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** Ha sido prohibido por`)
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderacion**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Baneado por**", message.author.username)
                .addField("**Rason**", `${reason || "**Ninguna rason**"}`)
                .addField("**Fecha**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
