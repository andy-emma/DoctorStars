const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
  
 // Change this if you have a diffrent cmd handler
 config : {
  name: "stealemoji",// Change this if you have a diffrent cmd handler
  aliases:['addemoji','steal'],// Change this if you have a diffrent cmd handler
  description: "Steal an emoji from a different server"},// Change this if you have a diffrent cmd handler
  run : async(client , message, args, Discord) => {// Change this if you have a diffrent cmd handler 

    if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send('you don\'t have the permissions to manage emojis')

    const emoji = args[0];
    const name = args.slice(1).join(" ");
    if (!emoji) {
      const embed = new MessageEmbed()
               .setDescription(`¡Por favor, dame un emoji!`)
               .setColor('RANDOM')
      return message.channel.send(embed )
    }

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || "give_name");

        const embed = new MessageEmbed()
          .setTitle(`Emoji Añadido`)
          .setThumbnail(`${emoji}`)
          .setColor('#FF69B4')
          .setDescription(
            `¡Se ha añadido un emoji! | Nombre: ${
              name || "give_name"
            } `
          );
        return message.channel.send(embed);
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }` ;

        await message.guild.emojis.create(
          `${link}`,
          `${name || `${customEmoji.name}`}`
        );
       
        const embed = new MessageEmbed()
          .setTitle(`Emoji Added <:${customEmoji.name}:${customEmoji.id}>`)
          .setColor('#FF69B4')
          .setThumbnail(`${link}`)
          .setDescription(
            `¡Se ha añadido un emoji! | Nombre: ${
              name || `${customEmoji.name}`
            } | Preview: [Click aqui](${link})`
          );
        return message.channel.send(embed);
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
           const embed = new MessageEmbed()
               .setDescription(`Proporciona un emoji válido. No puedo trabajar con este bs`)
               .setColor('RANDOM')
          return message.channel.send(embed);
        }
        const embed = new MessageEmbed()
               .setDescription(`Bruv, este es un emoji normal que puedes usar en cualquier lugar.`)
               .setColor('RANDOM')
        message.channel.send(embed
          
        )
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Se alcanzó el número máximo de emojis (50)"
        )
      ) {
         const embed = new MessageEmbed()
               .setDescription(`¡Se alcanzó el número máximo de emojis para este servidor!`)
               .setColor('RANDOM')
        
        return message.channel.send(embed)
      }
    }
  },
};