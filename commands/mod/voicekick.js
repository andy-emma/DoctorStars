module.exports = {
    config: {
        name: "voicekick",
        aliases: ["vckick"],
        description: "kick a member from the vc ",
        usage: "z!vckick [mention]"
    },
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "¡No tengo los permisos adecuados para usar este comando!"
      );

    if (!message.mentions.members.first())
      return message.channel.send(
        `Por favor, mencione al usuario que desea iniciar desde el canal de voz.`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`¡El usuario no está en ningún canal de voz!`);

    message.mentions.members.first().voice.kick();
    
    message.channel.send(`¡El usuario ha sido expulsado del canal de voz! `)
  }
};