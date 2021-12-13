const Discord = require("discord.js");


module.exports = {
  config : {
        name: "singlevoicemove",
        aliases: ["smove","svm"],
       example: `c!smove @kalyan`,
        category: "Moderation",
        description: "Can move a user to other vc",
        accessableby: "admin",
        args: true },
    run: async(client,message,args) => {
        if(!message.member.permissions.has("MOVE_MEMBERS")) return message.reply("No puedes usar ese comando, cariño");
        if(!message.guild.me.permissions.has("MOVE_MEMBERS")) return message.channel.send("Necesito el permiso 'MOVER_MIEMBROS'");
        if(!args[0]) return message.channel.send("Uso: vmove <member> <voice channel>");
        if(!args[1]) return message.channel.send("Uso: vmove <member> <voice channel>");
        const channel = message.guild.channels.cache.get(args[1]) ||
        message.guild.channels.cache.find(c=>c.type==="voice"&&c.name.toLowerCase()===args[1].toLowerCase());
        if(!channel) return message.channel.send("Hey, eso no es un canal");
        if(channel.type!=="voice") return message.channel.send("That's not a voice channel!");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLowerCase());
        if(!member.voice.channel) return message.channel.send(`No puedo ver **${member.user.tag}** En cualquier canal de voz`);
        if(!member) return message.channel.send("No puedo encontrar a ese miembro.");
        try {
            member.voice.setChannel(channel, `Comando ejecutado por ${message.author.tag}`);

            let reason = args.slice(2).join(" ");

        if(!reason) reason = 'No-proporcionado';
 
    
const embed = new Discord.MessageEmbed()
      .setDescription(` Un miembro ha sido movido de vc\n\nModerador: <@${message.author.id}>\nMiembros: ${member}\nCanal:<#${message.channel.id}>`)
      .setColor('YELLOW');
            return message.channel.send(embed);
        } catch(err) {
            return message.channel.send("Un miembro ha sido movido de vc ");
        }
    }
} 