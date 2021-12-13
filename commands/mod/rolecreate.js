  
const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  config: {
    name: "rolecreate",
    description: "Add a role to a member",
    usage: "m/roleadd <member mention/id> <role mention/role id>",
    aliases: ['rolecreate']
  },

 run: async (client, message, args) => {
        const name = args.slice(1).join(" ")
        const regex = !/[^a-zA-Z0-9]+/g.test(name)
        if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("No tienes suficientes permisos")
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("No tengo suficientes permisos para hacer esto")
        }
        if (!args[0]) {
        return message.channel.send("`Uso: <prefix> createrole <color> <Nombre>`")
        }
        if (!name) {
        return message.channel.send("Necesita especificar un nombre para su rol")
        }
        if (regex === false) {
        return message.channel.send("Ese no es un nombre de rol válido. Puede contener solo letras y números")
        }
        if (name.length > 100) {
        return message.channel.send("Tu rol no puede tener más de 100 caracteres")
        }
        message.guild.roles.create({
            data: {
                name: name,
                color: toHex(args[0])
            }
        })
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`
**Rol: ** ${name}
**Accion: ** Nuevo rol creado
**Rol Color: ** ${args[0]}
**Canal: ** ${message.channel}
**Por: ** ${message.member}
      `)
   message.channel.send(embed);
    }
}