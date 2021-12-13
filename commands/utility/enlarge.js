const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `#ffffff`;

module.exports = {
  config : {
    name: "jumbo",
    category: "fun",
    description: "Converting Server emoji to PNG/GIF!"},
    run: async(client, message, args) => {


        const authoravatar = message.author.avatarURL();
        const emoji = args[0];
        if (!emoji) return message.channel.send(`¡Por favor, dame un emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;

            const Added = new MessageEmbed()
                .setAuthor(`Engrandecido Emoji`, authoravatar)
                .setColor(`${Color}`)
                .setDescription(`\`${customemoji.name}\` \`${customemoji.id}\``)
                .setImage(Link
                );
            return message.channel.send(Added);
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`¡Por favor, dame un emoji válido!`);
            message.channel.send(
                `¡Puede usar emoji normal sin agregar un servidor!`
            );
        }
    }
};