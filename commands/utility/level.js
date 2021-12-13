const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const { PREFIX } = require('../../config');

module.exports = {
    config: {
        name: "level",
        aliases: ['xp'],
        category: 'info',
        description: 'Shows A User\'s Current XP Level',
        usage: '[mention | username | nickname | ID] (optional)',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        try {
            let prefix;
            let fetched = await db.fetch(`prefix_${message.guild.id}`)
            if (fetched === null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
            if (!user) return message.channel.send('**Introduzca un usuario válido.**')
            if (user.user.bot) return message.channel.send(`** ¡El bot no tiene nivel de XP!**`);

            let guildMessages = db.fetch(`guildMessages_${message.guild.id}`)
            if (guildMessages === null) return message.channel.send(`**¡Los mensajes de nivel superior están actualmente desactivados!\n\`${prefix}setxp\` para habilitar**`);

            let xp = db.fetch(`messages_${message.guild.id}_${user.id}`)
            let lvl = db.fetch(`level_${message.guild.id}_${user.id}`)

            if (lvl === null) lvl = 0
            if (xp === null) xp = 0

            let curxp = xp;
            let curlvl = lvl;
            let nxtLvlXp = curlvl * 100;
            let difference2 = nxtLvlXp + 100 - curxp;

            const embed = new MessageEmbed()
                .setTitle(`**${user.displayName}Nivel Informacion**`)
                .setColor("GREEN")
                .setDescription(`**Nivel actual - \`${curlvl}\` | Total XP - \`${curxp - 1}\`
                    XP necesaria para alcanzar el siguiente nivel - \`${difference2 + 1}\`**
                    `)
                .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed)

        } catch {
            message.channel.send(`**¡Oh no! Ocurrió un error**`);
        }
    }
};
