const request = require('node-superfetch');
const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const { wrapText } = require('../../functions');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Korrina.otf'), { family: 'Korinna' });

module.exports = {
  config: {
    name: 'trivia',
    aliases: ['quiz', 'singletrivia', 'jeopardy'],
    category: 'games',
    usage: ' ',
    description: 'Answer A Trivia Question, Join VC While Playing For More Fun (optional)\n Inspired By The Show Jeopardy',
    acessableby: 'everyone'
  },
  run: async (bot, message, args, ops) => {
    const current = ops.games.get(message.channel.id);
    if (current) return message.channel.send(`**Espere hasta el juego actual de \`${current.name}\` esta terminado**`);
    const { channel } = message.member.voice;
    try {
      ops.games.set(message.channel.id, { name: 'trivia' });
      const question = await fetchQuestion();
      const clueCard = await generateClueCard(question.question.replace(/<\/?i>/gi, ''));
      let connection;
      try {
        if (channel) {
          connection = message.guild ? await channel.join() : null;
          if (connection) {
            connection.play(path.join(__dirname, '..', '..', 'assets', 'sounds', 'jeopardy.mp3'));
            if (message.channel.permissionsFor(bot.user).has('ADD_REACTIONS')) {
              await message.react('🔉');
            } else {
              return message.channel.send("**Permisos faltantes - ¡[AÑADIR_REACCIONES]!**")
            }
          }
        }
      } catch {
        return message.channel.send("**Inténtelo de nuevo: se agotó el tiempo de espera de la conexión.**")
      }
      await message.channel.send(`**La Categoría es - \`${question.category.title.toUpperCase()}\`30 segundos para responder**`, {
        files: [{ attachment: clueCard, name: 'clue-card.png' }]
      });
      const messages = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
        max: 1,
        time: 30000
      });
      if (connection) {
        connection.dispatcher.end();
        channel.leave();
      }
      const answer = question.answer.replace(/<\/?i>/gi, '*');
      ops.games.delete(message.channel.id);
      if (!messages.size) return message.channel.send(`**¡Se acabó el tiempo, la respuesta fue \`${answer}\`!**`);
      const win = messages.first().content.toLowerCase() === answer.toLocaleLowerCase();
      if (!win) return message.channel.send(`**¡La respuesta fue ${answer}!**`);
      return message.channel.send(`**Respuesta correcta**`);
    } catch (err) {
      console.log(err)
      ops.games.delete(message.channel.id);
      return message.channel.send(`**¡Oh, no, se produjo un error, inténtelo de nuevo más tarde!**`);
    }
    async function fetchQuestion() {
      const { body } = await request
        .get('http://jservice.io/api/random')
        .query({ count: 1 });
      return body[0];
    }

    async function generateClueCard(question) {
      const canvas = createCanvas(1280, 720);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#030e78';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'white';
      ctx.font = '62px Korinna';
      const lines = await wrapText(ctx, question.toUpperCase(), 813);
      const topMost = (canvas.height / 2) - (((52 * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
      for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((52 + 20) * i);
        ctx.fillStyle = 'black';
        ctx.fillText(lines[i], (canvas.width / 2) + 6, height + 6);
        ctx.fillStyle = 'white';
        ctx.fillText(lines[i], canvas.width / 2, height);
      }
      return canvas.toBuffer();
    }
  }
};