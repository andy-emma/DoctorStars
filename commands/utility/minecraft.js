const Discord = require('discord.js')
module.exports = {
  config : {
  name: 'minecraft'},
  

  run :async (client , message , args) => {
  const sentence = args.join("+")
    
    if (!sentence) return message.channel.send('Por favor especifique un texto.')
    if (sentence > 22) return message.channel.send("Por favor, escriba un texto que no supere los 22 caracteres")
    let embed = new Discord.MessageEmbed()
      .setTitle('¡Logro desbloqueado!')
      .setImage(`https://api.cool-img-api.ml/achievement?text=${sentence}`)
      .setColor('RANDOM')
      .setFooter(' ');
    message.channel.send(embed)
  }
}