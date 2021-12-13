const Discord = require("discord.js")
const { readdirSync } = require("fs");

module.exports = {
    config: {
        name: "reloadmod",
        description: "Reload command- Dev Only",
        aliases: ['rmod']
    },

    run: async (bot, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Cargar")
        .setDescription("Lo sentimos, el comando `reload` solo puede ser ejecutado por el desarrollador.")
        .setColor("#cdf785");
        if(message.author.id !== '720218422222520410') return message.channel.send(embed);

        if(!args[0].toLowerCase()) return message.channel.send("Por favor, proporcione un nombre de comando.")

        let commandName = args[0].toLowerCase()

        try {
          
          delete require.cache[require.resolve(`./${commandName}.js`)]
          const pull = require(`./${commandName}.js`)
          bot.commands.set(pull.config.name, pull)
          message.channel.send(`Recargado con éxito: \`${commandName}\``)
        }

        catch (e) {
          console.log(e)
          return message.channel.send(`No se pudo recargar el comando: ${commandName} Del módulo de moderación porque: \n${e}`)
        }


      }
} 