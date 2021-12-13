const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");

module.exports = {
  config : {
    name: "unbanall",
  
  aliases: ['uball'],
  description: 'Can unbanll all the users',
   category: "Moderation",
  example: `c!unbanall`},


    run: async(client, message, args) => {
        const noadmin = new Discord.MessageEmbed()
            .setDescription(`*Tu no tienes \`ADMINISTRATOR\` Permisos para realizar esta ejecución.*`);

                if (message.member.hasPermission("ADMINISTRATOR")) {
                    message.guild.fetchBans().then(bans => {
                        if (bans.size == 0) {{
              const embed = new MessageEmbed()
               .setDescription(`No hay usuarios prohibidos.`)
               .setColor('RANDOM')
                 message.reply(embed)
            }   
                            
                        } else {
                            bans.forEach(ban => {
                                message.guild.members.unban(ban.user.id);
                            })
                            const emb = new Discord.MessageEmbed()
	.setTitle('Ubanned all')
	.setDescription(` Todos los usuarios prohibidos han sido eliminados \n\n Moderador:<@${message.author.id}>\n\nTodos los miembros prohibidos no prohibidos. `)

	.setColor("#00BFFF")
        message.channel.send(emb);
                            
                        }
                    }
                    )
                } else {
                    return await message.channel.send(noadmin);
      }
  },
  aliases: ['ul'],
  description: 'Unban all member',
  usage:"unbanall",
};