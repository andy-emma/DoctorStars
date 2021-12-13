const db = require('quick.db');

module.exports = {
    config: {
        name: 'cwelcome',
        noalias: [''],
        category: 'moderation',
        description: 'Use This To Get Verified In A Server',
        usage: ' ',
        accessableby: 'everyone'
    },
     run: async (bot, message, args) => {
     if (!message.member.hasPermission("ADMINISTRATION")) {
      return message.channel.send("Lo siento, necesitas ADMINISTRADOR.");
    }
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Primero mencione el canal.")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`El canal de bienvenida está configurado como ${channel}`)
  }
};