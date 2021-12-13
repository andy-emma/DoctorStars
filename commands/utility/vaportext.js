  
const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "vaportext",
    description: "Fun Command"},
    run: async(client, message, args) => {
        if (!args.length) {
        return message.channel.send("Necesitas ingresar algo de texto")
        }
        let msg = "";
        for (let i = 0; i < args.length; i++) {
        msg += args[i].toUpperCase().split("").join(" ") + " ";
        }
        message.channel.send(msg);
    }}