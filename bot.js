const Discord = require('discord.js'); // Discord.js 모듈 불러오기
const client = new Discord.Client(); // 이 Client는 Discord.js에서 핵심적으로 쓰이는 존재(?)라고 합니다.
const prefix = '!';
require('dotenv').config();

client.on('ready', () => { // client에 ready 이벤트가 발생하면 아래의 내용 출력하기
  console.log(`${client.user.tag} 봇에 로그인 했습니다!`);
});
// cf.) on과 달리 once는 이벤트를 한 번만 듣는다고 하네요.

client.on('message', msg => { // client에 message 이벤트가 발생할 경우의 동작 지정
  if (!msg.guild) return; // guild 이외의 곳에선 작동하지 않도록 설정
  if (msg.author.bot) return; // 메시지 사용자가 봇일 경우 작동하지 않도록 설정
  if (msg.content.indexOf(prefix) !== 0) return; // 메시지가 prefix(!)로 시작되지 않는 경우 작동하지 않도록 설정

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  /**
   * prefix를 짤라주고, 끝의 공백이 있다면 제거해준 뒤,
   * 메시지(문자열)를 띄어쓰기를 기준으로 나누어서 배열에 담아주기
   * 이때 가장 첫 번째 요소가 명령어가 되겠죠!?
   * 
   * ex) !kick Anne => ['kick', 'Anne']
   */

  const command = args.shift().toLowerCase();
  /**
   * 명령어 가져오기
   * shift는 원본 배열을 변환하는 메서드로서,
   * 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환합니다.
   * 즉, 이 경우에는 명령어가 반환될테고 그 값이 곧 command라는 변수에 바인딩 되겠죠!?
   * toLowerCase의 경우 사용자가 실수로 대문자를 입력한 경우에
   * 이를 소문자로 변환해주기 위해 작성합니다.
   */

  if (command === 'ping') { // 'ping'이라는 명령어를 받으면,
    msg.reply(`${client.ws.ping}ms`); // 웹소켓(websocket) 지연 시간을 알려주기
  }

  if (command === 'embed') {
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

  if (command === 'webhook') {
    const hook = new Discord.WebhookClient(
      process.env.WEBHOOK_ID,
      process.env.WEBHOOK_TOKEN
    );
    // 첫 번째 인자로는 앞서 만들었던 웹훅 ID를 전달해주시고,
    // 두 번째 인자로는 웹훅 토큰을 전달해주세요. (토큰의 경우 보안에 주의하세요!!)
    
    hook.send('Hello, new world!');
    // 지정되어있는 채널에 웹훅이 이 내용을 보내줍니다.
  }

  /* ----------------- 관리자 기능(Moderator) ---------------- */
  if (command === 'kick') { // 추방 명령
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

  if (command === 'block') { // 차단 명령
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

  if (command === 'clean') { // 메시지 청소 명령 (bulk delete)
    if (!args[0]) return msg.reply('청소할 만큼의 값을 정수로 적어주세요.');
    if (!Number(args[0])) return msg.reply('메시지를 지울 값으로는 반드시 숫자를 전달해주세요.');
    // Number는 인자로 전달한 값이 숫자로 암묵적 변환할 수 없는 값일 때 NaN을 반환합니다.
    if (args[0] < 1) return msg.reply('메시지를 지울 값은 1보다 커야 합니다.');
    if (args[0] > 100) return msg.reply('메시지를 지울 값은 100보다 작아야 합니다.');

    msg.channel.bulkDelete(args[0])
      .then(msg.reply(`${args[0]}만큼의 메시지를 성공적으로 삭제했습니다.`))
      .catch(console.error);
  }
});

client.login(process.env.BOT_TOKEN);
// 위에서 복사해두셨던 봇의 토큰을 인자로서 전달해주세요.
// 웹훅 토큰과 마찬가지로 보안에 주의하세요!!
