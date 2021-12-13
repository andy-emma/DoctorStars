const Discord = require('discord.js');
const config = require('../../config');
const fetch = require('node-fetch')

module.exports = {
    config: {
        name: 'wiki',
        description: 'Shows information about query from wikipedia',
        aliases: ["wikipedia"],
        usage: '<query>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const body = await fetch(
            `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`,
          ).then(res => res.json().catch(() => {}));
        
        if (!body) return message.channel.sendmessage.channel.send({embed: {
                      color: config.embedcolor,
                      title: "❌ Página de error no encontrada."
                  }})
          if (body.title && body.title === "Not found.") return message.channel.send({embed: {
                      color: config.embedcolor,
                      title: "❌ Página de error no encontrada."
                  }});
      
        const embed = new Discord.MessageEmbed()
            .setTitle(`🌐 ${body.title} `)
        .addField("Mas Informacion: ",`**[Click Aqui](${body.content_urls.desktop.page})**`, true)
            .setDescription(`** ${body.extract}**`)
            .setColor(config.embedcolor)
        .setTimestamp()
        
         if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        message.channel.send(embed);

    }
}

