const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "createvc",
    description: "Create Voice Channels in your Server"},
    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send("No tienes suficientes permisos")
}
    if (!args[0]) {
    return message.channel.send("Menciona el nombre del canal.")
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "voice"});

    const embed = new Discord.MessageEmbed()
    .setTitle("Actualizaciones del canal")
    .setDescription(`Se ha creado el canal`)
    .setColor("RANDOM");
  message.channel.send(embed);
}
}