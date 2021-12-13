const Discord = module.require("discord.js");

module.exports = {
    config: {
        name: 'emojiid',
        description: 'Emojifies your text message',
        aliases: ["emojiid","ei"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
      const name = args.join(" ");
        const emoji = message.guild.emojis.cache.find(r => r.name === name);
        if (!name) {
        return message.channel.send("Escribe el nombre del emoji")
        }
        if (!emoji) {
        return message.channel.send("No se pudieron encontrar los emojis con el nombre proporcionado. Asegúrate de que el nombre del emoji sea correcto.");
        }
        message.channel.send(`\`\`\`${emoji}\`\`\``)
}
}