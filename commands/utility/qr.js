const Discord = require('discord.js');

module.exports = {
  config : {
    name: "qr",
    aliases: ["qrcode"],
    category: "Utility",
    description: "Coneverts the provided link to a qr code cool ?",
    example: `c!qr https://youtube.com`},

    run: async (client, message, args) => {
    
        let link = (args[0])
        let qrlink = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`

        if (!link) 
        return message.channel.send(` ¡Por favor proporcione un enlace!`)

        if (require('is-url')(link)) {
            const attachment = new Discord.MessageAttachment(qrlink, 'qrcode.png');

            const embed = new Discord.MessageEmbed()
            .setTitle('El código QR está listo')
            .attachFiles(attachment)
            .setColor(message.guild.me.displayHexColor)
            .setImage('attachment://qrcode.png')
            .setFooter(`Pedido por ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            message.channel.send(embed)

        } else {
            message.reply(`${emoji.Error} Error proporcione un enlace válido que contenga \`https://\``)
        }

    }
}