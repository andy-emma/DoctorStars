const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "addmoney",
        aliases: ["am"],
        category: "economy",
        description: "Adds Money to a user",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ ¡No tiene permiso para agregar dinero! - [ADMINISTRADOR]");
        if (!args[0]) return message.channel.send("**¡Ingrese un usuario!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**¡Ingrese un usuario válido!**")
        if (!args[1]) return message.channel.send("**¡Ingrese una cantidad!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ ¡Tu monto no es un número!**`);
        if (args[0] > 10000) return message.channel.send("**¡No se puede agregar tanta cantidad!**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Añadi ${args[1]} monedas\n\nNuevo Balance: ${bal}`);
        message.channel.send(moneyEmbed)

    }
}