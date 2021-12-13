const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        description: "Shows Channel Info",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**Canal no encontrado**");

        let channelembed = new MessageEmbed()
            .setTitle(`Información del canal`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`**Información del canal para:** <#${channel.id}>`)
            .addField("**Nombre del Canal:**", channel.name)
            .addField("**NSFW:**", `${channel.nsfw || "Falso"}`)
            .addField("**Canal ID:**", channel.id)
            .addField("**Tipo de Canal:**", channel.type)
            .addField("**Descripccion del Canal:**", `${channel.topic || "Ninguna Descripccion"}`)
            .addField("**Canal creado en:**", channel.createdAt)
            .setColor("#dcf104")
        message.channel.send(channelembed);
    }
}