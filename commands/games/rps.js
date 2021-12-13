const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    config: {
        name: "rps",
        category: "games",
        aliases: ['rockpaperscissors'],
        description: "Rock Paper Scissors Game. React to one of the emojis to play the game.",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
      try
      {     const embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.member.displayName, message.author.displayAvatarURL())
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL())
            .setDescription("**¡Juega un juego de RPS contra el bot!\n¡Selecciona Reacciones para jugar!**")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(`**${result}**`, `${reacted} vs ${botChoice}`);

        m.edit(embed);

      } catch {
          return message.channel.send('**Permisos faltantes: [ADMINISTRAR_MENSAJES].**')
      }
        function getResult(me, botChosen) {
            if ((me === "🗻" && botChosen === "✂") ||
                (me === "📰" && botChosen === "🗻") ||
                (me === "✂" && botChosen === "📰")) {
                return "¡Tu ganas!";
            } else if (me === botChosen) {
                return "¡Es un empate!";
            } else {
                return "¡Perdiste!";
            }

        }

    }
}
 