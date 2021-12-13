const db = require('quick.db');

module.exports = {
    config: {
        name: 'disablexp',
        aliases: ['dxp'],
        category: 'moderation',
        description: 'Disables Server XP Messages',
        usage: ' ',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**¡Tu no tienes los permisos requeridos! - [ADMINISTRADOR]**")

        try {
            let a  = await db.fetch(`guildMessages_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**¡Los mensajes XP ya están desactivados en el servidor!**")
            } else {
                db.delete(`guildMessages_${message.guild.id}`)

                message.channel.send("**¡Los mensajes de XP se desactivan correctamente!**")
            }
            return;
        } catch {
            return message.channel.send("**¡Algo salió mal!**")
        }
    }
}