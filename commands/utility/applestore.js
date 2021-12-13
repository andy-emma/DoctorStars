const Discord = require('discord.js');
const config = require('../../config');
const AppleStore = require("app-store-scraper");


module.exports = {
    config: {
        name: 'applestore',
        description: '',
        aliases: ["astore"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
 if (!args[0])
      return message.channel.send(
        `Por favor, da algo para buscar - ${message.author.username}`
      );

    AppleStore.search({
      term: args.join(" "),
      num: 1,
      lang: 'es-mx'
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `No se encontró ninguna aplicación - ${message.author.username}!`
        );
      }
      
      let Description = App.description.length > 200 ? `${App.description.substr(0, 200)}...` : App.description
      let Price = App.free ? "FREE" : `$${App.price}`;
      let Score = App.score.toFixed(1);

      let Embed = new Discord.MessageEmbed()
        .setColor(config.embedcolor)
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(Description)
        .addField(`Precio`, Price, true)
        .addField(`Desarollador`, App.developer, true)
        .addField(`Puntos`, Score, true)
        .setFooter(`Pedido por ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
    }
}
