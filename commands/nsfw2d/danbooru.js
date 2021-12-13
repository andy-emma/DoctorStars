const randomPuppy = require('random-puppy');
var Discord = require('discord.js')
const config = require('../../config');
const superagent = require('superagent');

const request = require('node-fetch');
const fs = require("fs")


const booru = require('booru');

module.exports = {
    config: {
        name: 'danbooru',
        description: 'Searches danbooru image board',
        aliases: ["nsfw"],
        usage: '[command]',
        accessableby: "",
    },
  
  //command
    run: async (client, message, args) => {



  //Checks channel for nsfw
  var errMessage = "Este no es un canal NSFW";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('¡Ese tipo de cosas no están permitidas! ¡Ni siquiera en los canales NSFW!');

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('db', [query], {random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle("Danbooru:")
              .setImage(image.common.file_url)
              .setColor('#FF0000')
              .setFooter(`Tags: danbooru ${query}`)
              .setURL(image.common.file_url);
          return message.channel.send({ embed });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.channel.send(`¡No se encontraron resultados para **${query}**!`);
          } else {
              return message.channel.send(`¡No se encontraron resultados para **${query}**!`);
          }
})
  }
  };



    

