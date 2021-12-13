const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");


module.exports = {
  config : {
  name: "serverinfo",
  aliases: ["serverinformation"],
  description: "Show Server Information!",
  usage: "Serverinfo"
  },
  run: async (client, message, args) => {
    //Start
    const guild = message.guild;
    const Emojis = guild.emojis.cache.size || "No Emojis!";
    const Roles = guild.roles.cache.size || "No Roles!";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;

    const embed = new MessageEmbed()
      .setTitle("Info de " + guild.name)
      .setColor("YELLOW")
      .setThumbnail(guild.iconURL())
      .addField(`Nombre`, guild.name, true)
      .addField(`ID`, `${guild.id}`, true)
      .addField(`Creador`, `${guild.owner.user.tag}`, true)
      .addField(`Recuento de roles`, Roles, true)
      .addField(`Recuento de emojis`, Emojis, true)
      .addField(`Cuenta de miembros`, Members, true)
      .addField(`Humanos`, Humans, true)
      .addField(`Recuento de bots`, Bots, true)
      .addField(`Servidor creado en`, guild.createdAt.toDateString())
      .setFooter(`Pedido por ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};