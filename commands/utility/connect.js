const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "connect",
        aliases: ["join", "j"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },

run: async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "¡Debe unirse a un canal de voz antes de usar este comando!"
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("No tengo permiso para unirme al canal de voz.");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("No tengo permiso para hablar en el canal de voz.");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Se unió al canal de voz :white_check_mark: **")
      .setColor("BLUE")
  );
}
}