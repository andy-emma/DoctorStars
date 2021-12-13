const db = require('quick.db');

module.exports = {
    config: {
        name: "disablemodlogchannel",
        aliases: ['dmc', 'disablem', 'disablemodlog'],
        category: 'moderation',
        description: 'Disables Server Modlog Channel',
        usage: '[channel name | channel mention | channel ID]',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**¡Tu no tienes los permisos requeridos! - [ADMINISTRADOR]**")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.channel.send('**¡No hay ningún canal de Modlog configurado para deshabilitar!**')
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**¡Canal de bienvenida deshabilitado!**")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`**El canal Modlog se ha desactivado con éxito en \`${channel.name}\`**`)
            }
            return;
        } catch {
            return message.channel.send("**Error - `Permisos faltantes o el canal no existe`**")
        }
    }
}