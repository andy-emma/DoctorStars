const { delay, randomRange, verify } = require('../../functions');
const words = ['fire', 'draw', 'shoot', 'bang', 'pull', 'boom'];

module.exports = {
    config: {
        name: 'gunfight',
        noalias: [''],
        category: 'games',
        usage: '[mention | username | nickname | ID]',
        description: 'Engage In A Gunfight Against Another User',
        accessableby: 'everyone',
    },

    run: async (bot, message, args, ops) => {
        if (!args[0]) return message.channel.send("**Introduzca un usuario con el que jugar.**")
        let opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!opponent) return message.channel.send("**Introduzca un usuario válido.**")
        if (opponent.user.bot) return message.channel.send('**¡No se puede luchar contra los bots!**');
        if (opponent.user.id === message.author.id) return message.channel.send('**¡No puedes pelear contigo mismo!**');
        const current = ops.games.get(message.channel.id);
        if (current) return message.channel.send(`**Espere hasta el juego actual de \`${current.name}\` esta terminado**`);
        ops.games.set(message.channel.id, { name: 'gunfight' });
        try {
            await message.channel.send(`**${opponent}, ¿Aceptas este desafío?**`);
            const verification = await verify(message.channel, opponent);
            if (!verification) {
                ops.games.delete(message.channel.id);
                return message.channel.send(`**Parece ${opponent} no quiere jugar**`);
            }
            await message.channel.send('**¡Prepárate, el juego comenzará en cualquier momento!**');
            await delay(randomRange(1000, 10000));
            const word = words[Math.floor(Math.random() * words.length)];
            await message.channel.send(`Escribir \`${word.toUpperCase()}\` ahora!`);
            const filter = res => [opponent.user.id, message.author.id].includes(res.author.id) && res.content.toLowerCase() === word.toLocaleLowerCase();
            const winner = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000
            });
            ops.games.delete(message.channel.id);
            if (!winner.size) return message.channel.send('**¡Nadie ganó!*');
            return message.channel.send(`**El ganador es ${winner.first().author}!**`);
        } catch (err) {
            ops.games.delete(message.channel.id);
            throw err;
        }
    }
};