const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('여기는 대표 타이틀!') // 임베드에서 타이틀로 사용된다고 하네요.
      .setDescription('여기는 대표 설명!') // 타이틀을 설명해줍니다.
      .setColor('DARK_GOLD') // 색상을 설정합니다.
      .setFooter('여기는 푸터!') // 푸터를 설정합니다.
      .setThumbnail('http://blogfiles.naver.net/20151023_23/shin_0305_1445573936921jrPRT_JPEG/%BD%E6%B3%D7%C0%CF%BF%B9%BD%C3.jpg') // 썸네일로 사용될 이미지를 설정합니다.
      .setImage('https://github.com/TEAM-SUITS/Suits/raw/develop/client/public/assets/og-image.jpg?raw=true') // 임베드에서 사용될 이미지를 설정합니다.
      .setTimestamp() // 인자를 전달하지 않으면 현재 시각을 찍어냅니다.
      .addField('여기는 소제목', '여기는 설명'); // 첫 번째 인자로는 소제목을, 두 번째 인자로는 설명을 전달합니다.
    
    msg.reply(embed);
      // embed를 답변 내용으로서 전달하도록 합니다.
}

exports.config = {
    name: '임베드',
    aliases: ['embed', 'dlaqpem'],
    category: ['bot'],
    des: ['임베드에 대한 설명'],
    use: ['!임베드']
}