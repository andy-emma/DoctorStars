const { stripIndents } = require('common-tags');
const { delay } = require('../../functions');
const directions = ['up', 'down', 'left', 'right'];
const colors = ['red', 'blue', 'green', 'yellow'];
const fruits = ['apple', 'orange', 'pear', 'banana'];

module.exports = {
    config: {
        name: 'memory',
        noalias: [''],
        category: 'games',
        usage: '[number](1 - 20)',
        description: 'Test Your Memory',
        accessableby: 'everyone'
    },
    run: async (bot, message, args, ops) => {
        if (!args[0]) return message.channel.send('**¿Cuántas direcciones quieres tener para memorizar?**');
        let level = args[0];
        if (level < 1 || level > 20) return message.channel.send('**¡Solo puede seleccionar entre 1 y 20!**');
        const current = ops.games.get(message.channel.id);
        if (current) return message.channel.send(`**Espere hasta el juego actual de \`${current.name}\` está terminado**`);
        ops.games.set(message.channel.id, { name: 'memory' });
        try {
            const memorize = genArray(level);
            const memorizeDisplay = memorize.map(word => `\`${word.toUpperCase()}\``).join(' ');
            const memorizemessage = await message.channel.send(stripIndents`
				**Tienes 10 segundos para memorizar -**
				${memorizeDisplay}
			`);
            await delay(10000);
            await memorizemessage.edit('**Escriba lo que vio, ¡solo las palabras!**');
            const memorizeType = memorize.join(' ');
            const messages = await message.channel.awaitMessages(res => message.author.id === res.author.id, {
                max: 1,
                time: 30000
            });
            ops.games.delete(message.channel.id);
            if (!messages.size) return message.channel.send(`**¡Termino el tiempo! Era ${memorizeDisplay}!**`);
            const answer = messages.first().content.toLowerCase();
            if (answer !== memorizeType) return message.channel.send(`**Lo escribiste mal, lo fue ${memorizeDisplay}!**`);
            return message.channel.send('**Tu ganas!**');
        } catch (err) {
            ops.games.delete(message.channel.id);
            throw err;
        };
        function genArray(level) {
            const sourceArr = [colors, directions, fruits][Math.floor(Math.random() * 3)];
            const arr = [];
            for (let i = 0; i < level; i++) arr.push(sourceArr[Math.floor(Math.random() * sourceArr.length)]);
            return arr;
        };
    }
};