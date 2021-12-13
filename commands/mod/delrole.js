const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "deleterole",
    description: "Deletes a role"},
    run: async(client, message, args) => {
    const role = message.mentions.roles.first();
    if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("No tienes suficientes permisos")
    }
    if (!role) {
    return message.channel.send("`Uso: <prefix> delrole <role>`")
    }
    role.delete();
    const embed = new Discord.MessageEmbed()
    .setTitle("Actualización de roles")
    .setDescription (`${role} el rol ha sido eliminado`)
    .setColor("RANDOM");
  await message.channel.send(embed);
}
}