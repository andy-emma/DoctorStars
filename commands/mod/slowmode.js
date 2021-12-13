module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `¡No especificó el tiempo en segundos en el que desea configurar el modo lento de este canal también!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`¡Eso no es un número!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Configure el modo lento de este canal también **${args[0]}**`
    );
  },
};