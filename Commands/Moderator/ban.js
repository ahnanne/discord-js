exports.run = async (client, msg, args, prefix) => {
  const user = msg.mentions.users.first();

  if (!user) {
    msg.reply("차단하시기 전에 맨션을 먼저 해주세요!");
  } else {
    const member = msg.guild.member(user);

    if (member) {
      member.ban(`${msg.author.username}님에 의해 서버에서 차단됨.`) // audit log에 차단 내용 로그 남기기
        .then(member => {
          msg.reply(`성공적으로 ${member.user.tag}님을 차단하였습니다.`)
          // 채팅 친 곳에 해당 유저의 차단 내용 알리기
        })
        .catch(console.error);
    } else { // member가 없다면,
      msg.reply('이 서버에 존재하지 않는 유저입니다.');
    }
  }
}

exports.config = {
  name: '차단',
  aliases: ['ban', 'block'],
  category: ['moderator'],
  des: ['유저를 해당 서버에서 차단 시킵니다.'],
  use: ['!차단 <유저 맨션>']
}