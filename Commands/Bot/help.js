const Discord = require('discord.js');

exports.run = async (client, msg, args, prefix) => {
  // 🎀 '!도움말' + 명령어를 입력한 경우
  if (args[0]) {
    if (!client.commands.get(args[0]) && !client.aliases.get(args[0])) {
      return msg.reply(`${args[0]}에 대한 정보를 찾을 수 없습니다.`);
    }
  console.log(client.commands);
    const command = client.commands.get(args[0])
      ? client.commands.get(args[0]) // 명령어를 입력한 경우
      : client.commands.get(client.aliases.get(args[0])); // 명령어의 별명을 입력한 경우

    const config = command.config;
    const name = config.name;
    const aliases = config.aliases;
    const category = config.category;
    const description = config.des;
    const use = config.use;
  
    const Command = new Discord.MessageEmbed()
      .setTitle(`${name} 명령어`)
      .setColor('#0ea085')
      .setDescription(`\`\`\`\n사용법: ${use}\`\`\``)
      .addField('명령어 설명', `**${description}**`, false)
      .addField('카테고리', `**${category}**`, true)
      .addField('명령어의 별명', `**${aliases}**`, true);

    msg.reply(Command);
    return;
  }

  // 🎀 '!도움말'만 입력한 경우
  const categorys = client.category;
  // bot.js의 client.category를 categorys로 선언했습니다.

  const Commands = new Discord.MessageEmbed() // 메시지에 embed를 나타낸다고 합니다.
    .setAuthor(client.user.username + '봇 명령어', client.user.displayAvatarURL())
    .setColor('#0ea085')
    .setFooter(`${prefix}도움 <명령어>를 입력하여 해당 명령어를 자세히 확인해보세요.`);

  for (const category of categorys) {
    Commands.addField(
      category,
      `> **\`${client.commands.filter(el => el.config.category[0] === category).keyArray().join('`, `')}\`**`
    );
    /**
     * addField는 embed에서 소제목과 소 설명을 설정하는데요,
     * 첫 번째 인자로는 소제목으로 설정할 값을 전달해주고
     * 두 번째 인자로는 소 설명으로 설정할 값을 전달해줍니다.
     * 세 번째 인자로는 inline 요소처럼 보여질지에 대한 boolean 값을 전달합니다.
     * (false를 전달할 경우 block 요소처럼 보여집니다. 즉, 한칸을 다 차지합니다.)
     * 
     * keyArray는 Collection을 배열로 바꾸는 방법 중 하나라고 합니다.
     */
  }

  msg.reply(Commands);
};

exports.config = {
  name: '도움말',
  aliases: ['도움', '명령어', 'commands', 'help'],
  category: ['bot'],
  des: ['봇에 대한 명령어 리스트들을 불러와드립니다.'],
  use: ['!도움말 <명령어>']
};
