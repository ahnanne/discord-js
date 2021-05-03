exports.run = async (client, msg, args, prefix) => {
  if (!args[0]) return msg.reply('청소할 만큼의 값을 정수로 적어주세요.');
    if (!Number(args[0])) return msg.reply('메시지를 지울 값으로는 반드시 숫자를 전달해주세요.');
    // Number는 인자로 전달한 값이 숫자로 암묵적 변환할 수 없는 값일 때 NaN을 반환합니다.
    if (args[0] < 1) return msg.reply('메시지를 지울 값은 1보다 커야 합니다.');
    if (args[0] > 100) return msg.reply('메시지를 지울 값은 100보다 작아야 합니다.');

    msg.channel.bulkDelete(args[0])
      .then(msg.reply(`${args[0]}만큼의 메시지를 성공적으로 삭제했습니다.`))
      .catch(console.error);
}

exports.config = {
  name: '청소', // 위 코드를 실행할 명령어 지정
  aliases: ['clear', 'clean'], // 명령어의 별명을 지정(이 단어들을 호출해도 위 코드가 실행됨.)
  category: ['moderator'], // 명령어 카테고리 지정
  des: ['bulkdelete'], // 명령어에 대한 설명
  use: ['!청소 <청소 할 메세지의 수>'] // 명령어 사용 방법 기재
}