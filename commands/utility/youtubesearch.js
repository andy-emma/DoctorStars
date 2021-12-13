const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "ytsearch",
   description: "Search For results on Youtube"},
  
    run: async(client, message, args) => {
    const text = args.join(' ');
    const search = args.join('+');
    if (!text) {
    return message.channel.send("Ingrese algún texto para buscar")
    }
    const embed = new Discord.MessageEmbed()
    .setTitle("Busqueda YT")
    .addField(`Usted buscó`, `${text}`)
    .addField(`Resultadoss`, `[Esto es lo que encontré](https://youtube.com/results?search_query=${search})`)
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}