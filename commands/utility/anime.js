const Discord = require('discord.js');
const config = require('../../config');
const Scraper = require('mal-scraper')

module.exports = {
    config: {
        name: 'anime',
        description: 'Shows information about anime',
        aliases: ["anime"],
        usage: '<query/name>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        let Text = args.join(" ");

        if (!Text) return message.channel.send(`¡Por favor, da algo!`);
      
        if (Text.length > 200) return message.channel.send(`Limite de Texto - 200`);
      
        let Msg = await message.channel.send(`**Buscándolo por ti **`);
      
        let Replaced = Text.replace(/ /g, " ");
      
        await Msg.delete();
      
        let Anime;
      
        let Embed;
      
        try {
      
        Anime = await Scraper.getInfoFromName(Replaced);
      
        if (!Anime.genres[0] || Anime.genres[0] === null) Anime.genres[0] = "None";
      
        Embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription(Anime.synopsis)
        .addField(`Tipo`, Anime.type, true)
        .addField(`Estatus`, Anime.status, true)
        .addField(`Premiered`, Anime.premiered, true)
        .addField(`Episodios`, Anime.episodes, true)
        .addField(`Duracion`, Anime.duration, true)
        .addField(`Popularidad`, Anime.popularity, true)
        .addField(`Generes`, Anime.genres.join(", "))
        .setThumbnail(Anime.picture)
        .setFooter(`Score - ${Anime.score}`)
        .setTimestamp();
      
        } catch (error) {
          console.log(error)
          return message.channel.send(`No Anime Found!`)
         
        };
      
        return message.channel.send(Embed);
    }
}

