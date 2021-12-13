  
const discord = require("discord.js");

module.exports = {
config : {
  name: "avatar",
  aliases: ["av", "ava"],
  category: "info",
  description: "Get avatar of any user"
},
  run: async (client, message, args) => {
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]).user;
    } else {
      user = message.author;
    }

    let avatar = user.displayAvatarURL({ dynamic: true, size: 2048 });

    let embed = new discord.MessageEmbed();
    embed.setTitle(`${user.tag} avatar.`)
    embed.setDescription(`[Descarga el Avatar](${avatar})`);
    embed.setImage(avatar);
    embed.setColor("RANDOM");
    embed.setFooter(message.guild.name, message.guild.iconURL())
    message.channel.send(embed);
  }
};