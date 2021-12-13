const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "En linea",
    idle: "Ausente",
    dnd: "No Molestar",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "Userinfo",
        description: "userinfo",
        usage: "m/Userinfo <mention a member/member id>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Expulsar Miembros");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Banear Miembros");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrador");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Administrar Mensajes");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Administrar Canales");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mencionar Todos");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Administrar Apodos");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Administrar Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Administrar Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Administrar Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No se encontraron permisos clave");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Creador del Servidor';
        }
    
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#060606')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('__Se unió a las:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('__Se unió a las__', member.user.createdAt.toLocaleString())
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Ningun Rol"}`)
            .addField("\n__Agradecimientos:__ ", `${acknowledgements}`)
            .addField("\n__Permisos:__ ", `${permissions.join(` | `)}`);
            
        message.channel.send({embed});
    
    }
    }
