const Discord = require("discord.js");
const figlet = require("figlet");

module.exports = {
  config : {
  name: 'ascii'},

  run : async (client, message , args) => {
 let p = args.join(" ")
figlet(p, function(err, data) {
    if (err) {
        message.channel.send('Algo salió mal...');
        console.dir(err);
        return;
    }
    message.channel.send(`\`\`\`${data}\`\`\``)
});
  }
}