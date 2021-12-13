const Discord = require("discord.js");

module.exports = {
config: {
  name: "announce",
  aliases: ["aa"],
  category: "Info",
  description: "Announce Your Message To Anothr Channel",
  usage: "announce #channel your message"
},
  run: async (client, message, args) => {
    if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send("You don't have premmsions to do that!");

    let inline = true;
    let sayChannel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!sayChannel)
      return message.channel.send(
        `<a:No_DoS:892135170054967360> | ${message.author} Mencionar un canal primero`
      );
    let sayMsg = args
      .slice(1)
      .join(" ")
      .split(" | ");

    if (!sayMsg[1]) sayMsg[1] == "FF7034";
    if (!sayMsg)
      return message.channel.send(
        ` | Di algún mensaje para anunciar`
      );
    let role = message.member.highestRole;
    let embed = new Discord.MessageEmbed()
      .setColor(sayMsg[1])
      .setDescription(sayMsg[0]);

    message.delete();
    message.channel
      .send(
        `<a:Yes_DoS:892135170235334666>  | Anunció con éxito su mensaje a ${sayChannel}`
      )
      .then(m => m.delete({ timeout: 2000 }));

    sayChannel.send({ embed }).catch(console.error);
  }
};