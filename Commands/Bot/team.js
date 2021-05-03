exports.run = async (client, msg, args, prefix) => {
  const channel = client.channels.cache.get('592315290264797198');
  // 대상 음성 채널의 id를 인자로 전달
  let testArray = [];
  for (let member of channel.members) {
    testArray.push('<@' + member[1].user.id + '>'); // 봇이 해당 사용자를 맨션하도록
    await msg.channel.send('<@' + member[1].user.id + '>');
  }
}

exports.config = {
  name: '팀짜기',
  aliases: ['team', '팀'],
  category: ['bot'],
  des: ['랜덤으로 팀을 정합니다.'],
  use: ['!팀짜기']
}