const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
    description: "Sets A Mute Role For Muted Users!",
    usage: "[role name | role mention | role ID]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Muterole establecido en este servidor es \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Por favor ingrese un nombre de rol o ID para configurar.**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Ingrese un nombre o ID de función válido.**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**¡Este papel ya está establecido como muterole!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` ¡Se ha establecido con éxito como Muterole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Error - `Permisos faltantes o el rol no existe.`**",
        `\n${e.message}`
      );
    }
  }
};
