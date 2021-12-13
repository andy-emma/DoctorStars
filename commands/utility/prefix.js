const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Chnage/Know The server's Prefix or the Global Prefix",
        usage: "m/prefix <new prefix/reset>",
        example: "1) m/prefix = \n2) m/prefix reset",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("No está permitido o no tiene permiso para cambiar el prefijo")
              }
            
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMi prefijo por \`${message.guild.name}\`  is  **` + `  \`${prefix}\` \n**Tipo \`${prefix}help\` for help**`)
              
              message.channel.send(prefEmbed);
            }

            if(option.toLowerCase() === "reset") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.channel.send("Prefijo reseteado ✅")
            }
            
            if(args[1]) {
              return message.channel.send("No se puede establecer el prefijo de un argumento doble")
            }
            
            if(args[0].length > 4) {
              return message.channel.send("No se puede enviar prefijo de más de 4 caracteres")
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("Prefijo reseteado✅")
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`Hecho ✅ | Prefijo de bot establecido en ${args[0]}`)
            

        }
        
    }