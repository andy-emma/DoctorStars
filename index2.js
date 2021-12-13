///BOT AOI //
const dbd = require("dbd.js");
const Aoijs = require("aoi.js");
const bot = new Aoijs.Bot({
  mobile: false,
  token: "ODkxMzg0ODU3MTAyNTQwODMw.YU9k1w.JLNrS2b157zeiVrJSQswXHaF_AU",

  prefix: ["<!@$clientId>", "<@$clientId", "$getServerVar[prefix]",]
})
bot.onMessage({
  guildOnly: true
})//s   
bot.loadCommands("./botaoi");
bot.variables(require('./botaoi/Bot-devs/variables.js'))
bot.command({
  name: "xd",
  code: `xd`
})