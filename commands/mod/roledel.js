const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    description: "Remove a role from a member",
    usage: "m/roledel <member mention/member id> <role mention/role id>",
    aliases: ['role del', 'role delete', 'rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("¡No tienes permiso para ejecutar este comando!")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Proporcione un usuario del que eliminar una función.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Proporcione una función para eliminar de dicho usuario.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("No tengo permiso para ejecutar este comando. ¡Por favor, dame permiso para administrar roles!")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`#FF0000`)
      .setDescription(`Error ❌ | ${rMember.displayName}, ¡No tiene este rol!`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`#00FF00`)
      .setDescription(`Exito ✅ | ${rMember} Ha sido eliminado de **${role.name}**`)

      message.channel.send(rolDEL)
    
    }

  },
};
