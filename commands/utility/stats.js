const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    config: {
        name: "stats",
        aliases: ['bot-info'],
        category: "info",
        description:"Mustra estadistica del bot",
        usage: "",
   },
    run: async (client, message, args) => {
        
    const d = moment.duration(client.uptime);
    const days = (d.days() == 1) ? `${d.days()} dia` : `${d.days()} dias`;
    const hours = (d.hours() == 1) ? `${d.hours()} horas` : `${d.hours()} horas`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} segundos` : `${d.seconds()} segundos`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} minutos` : `${d.minutes()} minutos`;
    const { totalMemMb, usedMemMb } = await mem.info();
    const clientStats = stripIndent`
      Servidores   :: ${client.guilds.cache.size}
      Usuarios    :: ${client.guilds.cache.reduce(
    (prev, guild) => prev + guild.memberCount, 0)}
      Canales  :: ${client.channels.cache.size}
      WS Ping   :: ${Math.round(client.ws.ping)}ms
      Uptime    :: ${days} - ${hours} - ${minutes} y ${seconds}
      Libreria :: Discord.js
      Lenguaje :: JavaScript
      Creadores :: Emmaa#0001 - ! ꧁ ༺𝑫𝒊𝒆𝒈𝒐 𝒂𝒏𝒅𝒓𝒆𝒔༻꧂#0458
    `;
    
    const embed = new MessageEmbed()
      .setTitle('BotInfo\' Estadisticas')
      .setDescription(`\`\`\`asciidoc\n${clientStats}\`\`\``)
  
      	
   .setColor("060606")

   .setTimestamp()

  
    message.channel.send(embed);
    }
}
