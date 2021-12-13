const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");


module.exports = {
  config : {
    name: 'role',
    description: 'Add or remove a role to a user',
    category: 'moderation',
     aliases: ['r'],
    usage: 'c!<user mention, id or username> <role name, id or mention>',
    aliases: [],
    botPermission: ['MANAGE_ROLES'],
    authorPermission: ['MANAGE_ROLES'],
    testOnly: false,
    ownerOnly: false
  },
    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(x => x.name.toLowerCase() === args.slice(1).join(" ") || x.name === args[1])

        if (!user) {
          const embed = new MessageEmbed()
               .setDescription(`Necesitas especificar un miembro válido`)
               .setColor('YELLOW')
            return message.channel.send(embed)
        }

        if (!role) {
           const embed = new MessageEmbed()
          .setDescription(`Debes especificar un rol válido`)
               .setColor('YELLOW')
            return message.channel.send(embed)
        }     
        
        if (message.guild.me.roles.highest.id === role.id) {
            return message.channel.send(`No puedo agregar o quitar ese rol porque ese es mi rol más alto`)}
      
          
         

        if (user.roles.cache.has(role.id)) {
            try {
                user.roles.remove(role.id)
                
           const embed = new MessageEmbed()
          .setDescription(`<a:Yes_DoS:892135170235334666> Cambios de roles para ${user.user.tag}, -${role.name}`)
               .setColor('GREEN')
            return message.channel.send(embed)
            
               
            }
            catch (e) {
                return message.channel.send(`Hubo un error: ${e}`)
            }
        } else {
            try {
                user.roles.add(role.id)
           const embed = new MessageEmbed()
          .setDescription(`<a:Yes_DoS:892135170235334666>  Cambios de roles para ${user.user.tag}, +${role.name}`)
               .setColor('GREEN')
            return message.channel.send(embed)
             
               
            }
            catch (e) {
                return message.channel.send(`Hubo un error: ${e}`)
            }
        }
    }
}