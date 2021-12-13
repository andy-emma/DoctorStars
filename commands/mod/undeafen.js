const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "undeafen",
        description: "Undeafen a member in a voice channel",
        usage: "Undeafen <user>",
        aliases: ["undeaf"]
       
    },

    run: async(bot, message, args) => {
     if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**¡No tienes los permisos para prohibir usuarios! - [ENSORDECER_MIEMBROS]**");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("No se pudo encontrar al usuario mencionado en este gremio.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Raason proporcionado"


        try {
            member.voice.setDeaf(false, reason);
            message.channel.send("Hecho ✅ : Miembro ensordecer")
        } 
        
        catch (error) {
            console.log(error)
            message.channel.send("¡UPS! Ocurrió un error desconocido. Por favor, inténtelo de nuevo más tarde.")
        }

    }
}