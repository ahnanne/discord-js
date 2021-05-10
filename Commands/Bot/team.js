const makeTeam = require('../../utils/teamMaker');

exports.run = async (client, msg, args, prefix) => {
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

  const channel = client.channels.cache.get('592315290264797198');
  // 대상 음성 채널의 id를 인자로 전달
  let membersArray = [];

  for (let member of channel.members) {
    membersArray.push('<@' + member[1].user.id + '>'); // 봇이 해당 사용자를 맨션하도록
  }

  // utils/teamMaker.js 테스트를 위한 mock data
  // membersArray = [
  //   '<@517805308513615900>' + 0,
  //   '<@517805308513615900>' + 1,
  //   '<@517805308513615900>' + 2,
  //   '<@517805308513615900>' + 3,
  //   '<@517805308513615900>' + 4,
  //   '<@517805308513615900>' + 5,
  //   '<@517805308513615900>' + 6,
  //   '<@517805308513615900>' + 7,
  //   '<@517805308513615900>' + 8,
  //   '<@517805308513615900>' + 9,
  //   '<@517805308513615900>' + 10,
  //   '<@517805308513615900>' + 11,
  // ];

  membersArray = [
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
    '<@517805308513615900>',
  ];

  const teamArray = makeTeam(membersArray, +args[0]);

  const result = teamArray.map((team, idx) => {
    const nameArray = team.map(member => member.name);

    return `${idx + 1}팀: ${nameArray.join(', ')}`;
  });

  await msg.channel.send(result.join('\n'));
  // console.log(testArray.join('\n'));
};

exports.config = {
  name: '팀짜기',
  aliases: ['team', '팀'],
  category: ['bot'],
  des: ['랜덤으로 팀을 정합니다.'],
  use: ['!팀짜기 <한 팀당 인원 수>']
};
