const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  config: {
    name: "roleinfo",
    description: "XD",
    usage: "m/roleinfo <member mention/id> ",
    aliases: ['roleinfo']
  },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**¡Ingrese un rol!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**¡Ingrese un rol válido!**");

        const status = {
            false: "No",
            true: "Si"
        }

        let roleembed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle(`Informacion del Rol: \`[${role.name}]\``)
            .setThumbnail(message.guild.iconURL())
            .addField("**ID:**", `\`${role.id}\``, true)
            .addField("**Nombre:**",`\`${role.name}\``, true)
            .addField("**Hex:**", `\`${role.hexColor}\``, true)
            .addField("**Miembros:**", `\`${role.members.size}\``, true)
            .addField("**Posicion:**", `\`${role.position}\``, true)
            .addField("**Mencionable:**", status[role.mentionable], true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
            .setTimestamp()

        message.channel.send(roleembed);
    }
}