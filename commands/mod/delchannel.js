const Discord = module.require("discord.js");

module.exports = {
  config : {
	name: "delchannel",
	description: "Delete Channels From your Server"},
	run: async(client, message, args) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
	return message.channel.send("No tienes suficientes permisos")
	}
        const fetchedChannel = message.mentions.channels.first();
	if (!fetchedChannel) {
	return message.channel.send("`Uso: <prefix> delchannel <channel>`")
        }
	fetchedChannel.delete()

	const embed = new Discord.MessageEmbed()
	.setTitle("Actualizaciones del canal")
	.setDescription ("El canal ha sido eliminado")
  
	.setColor("RANDOM");
	
	await message.channel.send(embed);
}
}