const db = require('quick.db');

module.exports = {
    config: {
        name: 'setxp',
        aliases: ['enablexp'],
        category: 'moderation',
        description: 'Enables Server XP Messages',
        usage: ' ',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**¡Tu no tienes los permisos requeridos! - [ADMINISTRADOR]**")

        try {
            let a = await db.fetch(`guildMessages_${message.guild.id}`)

            if (a) {
                return message.channel.send("**¡Los mensajes XP ya están habilitados en el servidor!**")
            } else {
                db.set(`guildMessages_${message.guild.id}`, 1)

                message.channel.send("**¡Los mensajes XP se activaron correctamente!**")
            }
            return;
        } catch (e) {
            console.log(e)
            return message.channel.send("**¡Algo salió mal!**")
        }
    }
}