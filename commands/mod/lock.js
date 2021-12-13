const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
    config: {
        name: "lock",
        description: "lock channel",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**¡Error de permiso de usuario!**")
        .setDescription("**Lo sentimos, ¡no tienes permisos para usar esto! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`Hecho | ¡Canal bloqueado!`);
    }
}