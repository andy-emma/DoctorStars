const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  config : {
    name: "covid",
    category: "Utility",
    aliases: ["corona"],
    description: "Gives you the stats of the covid with your provided code",
    example: `c!covid India`,
  },
    run: async (client, message, args) => {
        let countries = args.join(" ");

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('Te faltan algunos argumentos (por ejemplo: d/ covid all o d/ covid Canadá o cualquier otro país)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Estadísticas mundiales de COVID-19 🌎`)
                .addField('Casos confirmados', confirmed)
                .addField('Recuperados', recovered)
                .addField('Muertos', deaths)
                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Estadísticas de COVID-19 para **${countries}**`)
                .addField('Casos confirmados', confirmed)
                .addField('Recuperados', recovered)
                .addField('Muertos', deaths)
                .setFooter(`Pedido por ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send(`${emoji.Error} Se proporcionó un país no válido`)
            })
        }
    }
}