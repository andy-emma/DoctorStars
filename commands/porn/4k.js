const client = require('nekos.life');
var Discord = require('discord.js')
const config = require('../../config');
const superagent = require('superagent');
const neko = new client();


module.exports = {
    config: {
        name: '4k',
        description: '4k images',
        aliases: ["nsfw"],
        usage: '<user>',
        accessableby: "",
    },

  run: async (client, message, args) => {
    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent

      var errMessage = `!Cuidado pervertido !,:3 El canal no es nsfw, pervertido u-u`;
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 30000 })
      })
      
  }
 var lo = new Discord.MessageEmbed()
 .setDescription(`Cargando...:Load_DoS:`)
 .setTimestamp()

 message.channel.send(lo).then(m => {

 superagent.get('https://nekobot.xyz/api/image').query({ type: '4k'}).end((err, response) => {

 var embed_nsfw = new Discord.MessageEmbed()
 .setDescription(`:underage:\n[¿La imagen no se carga?Haga clic aquí](${response.body.message})`)
 .setTimestamp()
 .setImage(response.body.message)
 .setFooter(client.FOTER)
 
 m.edit(embed_nsfw);

 });
 });
 }

  }
