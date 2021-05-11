const makeTeam = require('../../utils/teamMaker');

/* ---------------------------- random team maker --------------------------- */
exports.run = async (client, msg, args, prefix) => {
  // Map.prototype.forEach 메서드를 이용하여 현재 길드의 채널을 순회하며,
  // 메시지 작성자가 속해있는 음성채널 찾기
  let voiceChId = '';
  msg.guild.channels.cache.forEach((ch, chId) => {
    if (ch.type !== 'voice') return;

    for (let [ memberId ] of ch.members) {
      if (memberId === msg.author.id) voiceChId = chId;
      return;
    }
  });

  const channel = client.channels.cache.get(voiceChId);
  // 대상 음성 채널의 id를 인자로 전달

  if (!channel) { // 메시지 작성자가 음성 채널에 들어가지 않은 채 명령어를 입력했을 경우
    return await msg.reply(
      '음성 채널에 입장하신 뒤 팀짜기 명령어를 입력해주세요.'
    );
  }

  if (!args[0]) {
    await msg.reply(
      '한 팀당 인원 수를 함께 적어주세요. \n```\n!팀짜기 <한 팀당 인원 수>\n\n(ex: !팀짜기 3)```'
    );

    return;
  }

  if (Object.is(+args[0], NaN) || Math.floor(+args[0]) === 0) {
    await msg.reply(
      '올바른 숫자를 입력해주세요. \n```\n!팀짜기 <한 팀당 인원 수>\n\n(ex: !팀짜기 3)```'
    );

    return;
  }

  let membersArray = [];

  for (let member of channel.members) {
    membersArray.push('<@' + member[1].user.id + '>'); // 봇이 해당 사용자를 맨션하도록
  }

  // utils/teamMaker.js 테스트를 위한 mock data
  membersArray = [
    '<@517805308513615900>' + 0,
    '<@517805308513615900>' + 1,
    '<@517805308513615900>' + 2,
    '<@517805308513615900>' + 3,
    '<@517805308513615900>' + 4,
    '<@517805308513615900>' + 5,
    '<@517805308513615900>' + 6,
    '<@517805308513615900>' + 7,
    '<@517805308513615900>' + 8,
    '<@517805308513615900>' + 9,
    '<@517805308513615900>' + 10,
    '<@517805308513615900>' + 11,
  ];

  const teamArray = makeTeam(membersArray, +args[0]);

  const result = teamArray.map((team, idx) => `${idx + 1}팀: ${team.join(', ')}`);

  await msg.channel.send(result.join('\n'));
};

exports.config = {
  name: '팀짜기',
  aliases: ['team', '팀'],
  category: ['bot'],
  des: ['사용자와 같은 음성 채널에 있는 멤버들을 대상으로 랜덤으로 팀을 정합니다.'],
  use: ['!팀짜기 <한 팀당 인원 수>']
};
