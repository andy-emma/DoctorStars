const Discord = require('discord.js');
const config = require('../../config');

module.exports = {
  config : {
    name: "uptime",
    aliases: ["up", "uptime"],
    category: "Info",
    description: "Shows how long I've been online",
    example: `c!uptime`},

    run: async (client, message, args) => {
        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
      return Duration.replace("0 Dia\n", "").replace("0 Hora\n", "").replace("0 Minuto\n", "");
    };
    let Uptime = await RemoveUseless(`\`${Days}\` ${Days > 1 ? "Dias" : "Dia"} \`${Hours}\` ${Hours > 1 ? "Horas" : "Hora"} \`${Minutes}\` ${Minutes > 1 ? "Minutos" : "Minuto"} \`${Seconds}\` ${Seconds > 1 ? "Segundos" : "Segundo"}`);
    
    const embed = new Discord.MessageEmbed() 
    .setTitle(`Mi Uptime`)
    .setDescription(`${Uptime}`)
    .setTimestamp();

    await message.channel.send(embed)
    }
}