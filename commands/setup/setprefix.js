const db = require('quick.db');

module.exports = {
    config: {
        name: "setprefix",
        aliases: ['sp', 'prefix'],
        description: "Sets Custom Prefix",
        usage: "[prefix]",
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**¡No tiene suficientes permisos! - [ADMINISTRADOR]**")

        if (!args[0]) {
          let b = await db.fetch(`prefix_${message.guild.id}`);
          if (b) {
        return message.channel.send(
          `**El prefijo de este servidor es \`${b}\`**`
        );
      } else return message.channel.send("**Introduzca un prefijo para establecerlo.**");
    } 
      
        try {

            let a = args.join(' ');
            let b = await db.fetch(`prefix_${message.guild.id}`)

            if (a === b) {
                return message.channel.send('**¡Este ya es el prefijo del servidor!**')
            } else {
                db.set(`prefix_${message.guild.id}`, a)

                return message.channel.send(`**Establecer correctamente el prefijo del servidor en \`${a}\`**`)
            }
        } catch (e) {
            console.log(e)
        }
    }
  }