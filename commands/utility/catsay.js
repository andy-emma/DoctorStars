const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "catsay",
    description: "Make the cat say your message"},
    run: async(client, message, args) => {
   
    const state = "enabled";
    if (state === "disabled") {
    return message.channel.send("El comando ha sido deshabilitado por ahora");
    }
    const msg = args.join(" ");
    if (!msg) {
    return message.channel.send("¿Qué quieres que diga el gato?");
    }
    message.channel.send({files: [{attachment: `https://cataas.com/cat/cute/says/${msg}`, name: "catsay.png"}]});
    }
}