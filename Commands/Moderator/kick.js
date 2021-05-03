exports.run = async (client, msg, args, prefix) => {
  const user = msg.mentions.users.first();

  if (!user) {
    msg.reply("추방하시기 전에 맨션을 먼저 해주세요!");
  } else {
    const member = msg.guild.member(user);

    if (member) {
      member.kick(`${msg.author.username}님에 의해 서버에서 추방됨.`) // audit log에 추방 내용 로그 남기기
        .then(member => {
          msg.reply(`성공적으로 ${member.user.tag}님을 추방하였습니다.`);
          // 채팅 친 곳에 해당 유저의 추방 내용 알리기
        })
        .catch(console.error);
    } else { // member가 없다면,
      msg.reply('이 서버에 존재하지 않는 유저입니다.');
    }
  }
}

exports.config = {
  name: '추방',
  aliases: ['킥', 'kick'],
  category: ['moderator'],
  des: ['유저를 강제퇴장 시킵니다.'],
  use: ['!추방 <유저 맨션>']
}