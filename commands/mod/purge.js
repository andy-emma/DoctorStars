const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "purge",
        aliases: [],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "m/purge [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("¡No tienes suficientes permisos! - [ADMINISTRAR_MENSAJES]")
        if (isNaN(args[0]))
            return message.channel.send('**¡Proporcione una cantidad válida para eliminar mensajes!**');

        if (args[0] > 100)
            return message.channel.send("**Por favor, proporcione un número inferior a 100.**");

        if (args[0] < 1)
            return message.channel.send("**Por favor, proporcione un número más de 1.**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Eliminado con éxito \`${messages.size}/${args[0]}\` mensajes**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}