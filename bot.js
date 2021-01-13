const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://SİTENİZİN ADI/`);
      
      // http://siteadı.glitch.me/
    }, 30000);
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let rrrsembed = new Discord.MessageEmbed()
  let u = message.mentions.users.first() || message.author;
  if (command === "hazır-sunucu-2") {
  if (message.guild.channels.cache.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Hizmet Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.channels.create('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])    
 message.guild.channels.create('「📃」Discord-kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
 message.guild.channels.create('「🚪」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
       message.guild.channels.create('「✅」sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.channels.create('「💾」log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.channels.create('「📢」Duyuru-Panosu', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
             channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.channels.create('「💾」Güncellemeler', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
             channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.channels.create('「💾」Hizmet-Alanlar', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.channels.create('「📢」son-davet-takip"', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));

       }) 
       .then((collected) => {
        message.guild.channels.create('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
       id: message.guild.id,
     }]);

     message.guild.channels.create(`「💬」genel-sohbet`, 'text')
       .then(channel =>
        channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

     message.guild.channels.create(`「🤖」bot-komutları`, 'text')
       .then(channel =>
                  channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

      message.guild.channels.create(`「💡」şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

  message.guild.channels.create(`💬》Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  .then(c => {
    let role = message.guild.roles.cache.find("name", "@everyone");
    c.createOverwrite(role, {
        CONNECT: true,
    });
})

message.guild.channels.create('|▬▬|HİZMET ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);

message.guild.channels.create(`🔖》Java Hizmetleri`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.channels.create(`🔖》Plugin Hizmetleri`, 'text')
 .then(channel =>
  channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.channels.create(`🎮》Discord Bot hizmetleri`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.channels.create(`🎮》banner hizmetleri`, 'text')
 .then(channel =>
  channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
  message.guild.channels.create(`🎮》skript hizmetleri`, 'text')
  .then(channel =>
   channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
   message.guild.channels.create(`🎮》website hizmetleri`, 'text')
   .then(channel =>
    channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
    message.guild.channels.create(`🎮》ek hizmetleri`, 'text')
    .then(channel =>
     channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
     message.guild.channels.create(`🎮》harita hizmetleri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
      message.guild.channels.create(`🎮》tasarım hizmetleri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))

message.guild.channels.create('|▬▬|YÖNETİCİ ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);
 
message.guild.channels.create(`👑》Yönetim`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|YÖNETİCİ ODALARI|▬▬|")))
message.guild.channels.create(`👑》Yönetim`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|YÖNETİCİ ODALARI|▬▬|")))


message.guild.channels.create('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);
message.guild.channels.create(`🎮》Sayı-saymaca`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
message.guild.channels.create(`🎮》Kelime-Türet`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
message.guild.channels.create(`🎮》Matematik Türet`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
.then(channel =>
      
message.guild.channels.create('|▬▬|AFK ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}])); 
      
message.guild.channels.create(`💤》AFK`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.cache.find(channel => channel.name === "|▬▬|AFK ODALARI|▬▬|")))

       message.channel.send("**Bot** gerekli odaları kurdu! Bu kodu editliyen kişi: <@422505993998696459>")
     
            })   
    
}
});