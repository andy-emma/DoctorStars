const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { PREFIX } = require('../../config');

module.exports = {
    config: {
        name: "buy",
        noalias: [""],
        category: "economy",
        description: "buys items",
        usage: "[item]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        let author = db.fetch(`money_${user.id}`)

        let Embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Necesitas 200 monedas para comprar Bronze VIP`);


        if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            if (author < 200) return message.channel.send(Embed)

            await db.fetch(`bronze_${user.id}`);
            db.set(`bronze_${user.id}`, true)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ VIP de bronce comprado por 200 monedas`);

            db.subtract(`money_${user.id}`, 200)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Necesitas 600 monedas para comprar unas Nikes`);

            if (author < 600) return message.channel.send(Embed3)

            await db.fetch(`nikes_${user.id}`)
            db.add(`nikes_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Compre Nike frescas por 600 monedas`);

            db.subtract(`money_${user.id}`, 600)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Necesitas 800 monedas para comprar un auto nuevo`);

            if (author < 800) return message.channel.send(Embed5)

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Compró un auto nuevo por 800 monedas`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Necesitas 1200 monedas para comprar una mansión`);

            if (author < 1200) return message.channel.send(Embed7)

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Compró una mansión por 1200 monedas`);

            db.subtract(`money_${user.id}`, 1200)
            message.channel.send(Embed8)
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ ¡Ingrese un artículo para comprar!\nPrueba ${prefix}store ¡Para ver la lista de artículos!`)

             db.subtract(`money_${user.id}`, 900)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'role') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Necesitas 1500 monedas para comprar un rol personalizado`);

            if (author < 1500) return message.channel.send(Embed3)

            await db.fetch(`role_${user.id}`)
            db.add(`role_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Ya agregué su rol personalizado, pídale a un administrador que le dé el rol`);

                return message.channel.send(embed9)


    
        }
    }
}  
}