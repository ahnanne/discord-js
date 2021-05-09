const makeTeam = require('../../utils/teamMaker');

exports.run = async (client, msg, args, prefix) => {
  const channel = client.channels.cache.get('592315290264797198');
  // 대상 음성 채널의 id를 인자로 전달
  let membersArray = [];

  for (let member of channel.members) {
    membersArray.push('<@' + member[1].user.id + '>'); // 봇이 해당 사용자를 맨션하도록

    // await msg.channel.send('<@' + member[1].user.id + '>');
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

  const teamArray = makeTeam(membersArray, 3);

  const testArray = teamArray.map((team, idx) => {
    const nameArray = team.map(member => member.name);

    return `${idx + 1}팀: ${nameArray.join(', ')}`;
  });

  await msg.channel.send(testArray.join('\n'));
  // console.log(testArray.join('\n'));
};

exports.config = {
  name: '팀짜기',
  aliases: ['team', '팀'],
  category: ['bot'],
  des: ['랜덤으로 팀을 정합니다.'],
  use: ['!팀짜기']
};
