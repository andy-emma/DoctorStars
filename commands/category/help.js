var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
config: {
    name: "help",
    description: "Help Menu",
    usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
    example: "1) m/help\n2) m/help utility\n3) m/help ban",
    aliases: ['h']
},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

if(message.content.toLowerCase() === `${prefix}help`){
    var log = new Discord.MessageEmbed()
    .setColor(`#060606`)
     
      
    .setTitle("<:Man_DoS:914577128887058543> Aquí están todos mis comandos")
    .setDescription (`Hola soy un bot 100% creado en Discord.js V12.5.3 creado por \`Emmaa#0001 y ! ꧁ ༺𝑫𝒊𝒆𝒈𝒐 𝒂𝒏𝒅𝒓𝒆𝒔༻꧂#0458\`
   PD:Algunos comandos no funcionna porque ocupan API o Packpages que aveces caen`)
    
      .addField(
        "<:Putin_DoS:872268178280042506> **ADMINISTRADOR**",
        "`setmodlogchannel` `setnick` `slowmode` `setprefix` `setverification` `setxp` `disablemodlogchannel` `disablexp`"
      )
      .addField(
        "<:Mod_DoS:914577128698298379> **MODERACION**",
        "`Ban` `Kick` `vcmove` `smove` `voicekick` `lock` `unlock` `Unban` `Mute` `Purge` `Hackban` `uptime` `avatar` `embed` `announce` `imageannounce` `role` `roleadd` `roledel` `rolecreate` `deleterole` `createvc` `createchat` `delchannel` `disablexp` `setxp` `setprefix`"
      )
      .addField(
        "<:Gold_DoS:855208781587939348> **ECONOMIA**",
        "`work` `fish` `rob` `balance` `profile` `daily` `pay` `beg` `buy` `deposit` `leaderboard` `roulette` `sell` `setbackground` `setinfo` `slots` `store` `weekly` `withdraw`"
      )
      .addField(
        "<:Happy_DoS:855208805411323934> **JUEGOS**",
        "`blackjack` `connectfour` `duelquiz` `gunfight` `horserace` `memory` `poker` `rps` `russianroulette` `tictactoe` `trivia`"
      )
      .addField(
        "<a:Hehe_DoS:868951522984218711> **DIVERSION**",
        "`kiss` `hug` `pat` `zaglo` `slap` `smug` `tickle` `poke` `binary` `advice` `scroll`"
      )
      .addField(
        "<:Eyes_DoS:871788562297790464> **NSFW**",
        "|| `2dpussy` `2dboobs` `2dfeet` `2dholo` `2dholoero` `tits` `blowjobs` `cumart`  `ero` `erokitsune` `eroyuri` `femdom` `futanari` `gasm` `girlsolo` `hentai` `neko` `keta` `kitsune` `lesbian` `lewneko` `nekogif` `pussyart` `trap` `yuri` `danbooru` `gelbooru` `r34` `fuck` `kuni` `2danal` `cum` `suck` `masturbation` `spank` `4k` `ass` `anal` `porn` `pussy` `boobs` ||"
      )
      .addField(
        "<a:Discord_DoS:913998239018143764> **IMAGENES**",
        "`triggered` `delete` `rip` `jail` `captcha` `wideavatar` `toilet` `wa` `clyde` `wasted` `effect` `tweet` `minecraft` `blur` `beautiful` `catsay` `cowsay` `fliptext`"
      )
      .addField(
        "<a:FuegoA_DoS:914195315580624979> **UTILIDAD**",
        "`membercount` `yt` `steal` `define` `sourcebin` `docs` `weather` `qr` `applestore` `anime` `linkshorten` `playstore` `country` `ascii` `emojiid` `vaportext`"
      )


message.channel.send(log);
}
}
  }

 