const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "weather",
        noalias: "",
        category: "info",
        description: "Shows weather of a city",
        usage: "[city name]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('**Por favor ingrese un nombre de ciudad!**')
      
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
        
        if(err) message.channel.send(err.message);

        if(result.length === 0) {
            message.channel.send('**Ingrese una ubicación válida.**')
            return undefined;
        }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Clima para ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("GREEN")
                .addField('**Zona Horaria**', `UTC ${location.timezone}`, true)
                .addField('**Degree Type**', `${location.degreetype}`, true)
                .addField('**Temperatura**', `${current.temperature} Grados`, true)
                .addField('**Sentir**', `${current.feelslike} `, true)
                .addField('**Viento**', `${current.winddisplay}`, true)
                .addField('**Humedad**', `${current.humidity}%`, true)
                .addField('**Fecha**', `${current.date}`, true)
                .addField('**Daia**', `${current.day}`, true)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            message.channel.send({embed})

        });
    }
}