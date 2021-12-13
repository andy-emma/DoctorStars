const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "setnick",
        aliases: ["sn", 'nick'],
        category: "moderation",
        description: "Sets Or Changes Nickname Of An User",
        usage: "[mention | name | nickname | ID] <nickname>",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**¡No tienes permiso para cambiar el apodo! - [CAMBIAR_APODOS]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**¡No tengo permiso para cambiar el apodo! - [CAMBIAR_APODOS]**");
      
        if (!args[0]) return message.channel.send("**¡Ingrese un usuario!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**¡Por favor, ingrese un nombre de usuario!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**¡No se puede establecer o cambiar el apodo de este usuario!**')

        if (!args[1]) return message.channel.send("**Por favor escribe un apodo**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Se cambió el apodo de ${member.displayName} para ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Permisos faltantes: [CAMBIAR_NOMBRE]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderacion**", "setnick")
            .addField("**Nick cambió de**", member.user.username)
            .addField("**Nick cambiado por**", message.author.username)
            .addField("**Nick se cambió a**", args[1])
            .addField("**Fecha**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}