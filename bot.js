const Discord = require('discord.js');
const client = new Discord.Client();
// https://discord.js.org/#/docs/main/stable/class/Client
const fs = require('fs'); // 커맨드 핸들러를 만들기 위해 fs 모듈 사용
const config = require('./config.json');

client.on('ready', () => {
  console.log(`${client.user.tag} 봇에 로그인했습니다.`);
});

/**
 * Collection은 discord.js의 유틸리티 클래스로,
 * 자바스크립트의 Map 클래스를 확장한 것이라고 합니다.
 */
client.commands = new Discord.Collection();
// 명령어 캐시 컬렉션을 클라이언트 내에 선언합니다.
client.aliases = new Discord.Collection();
client.category = ['bot', 'moderator'];

/**
 * fs 모듈을 이용하여 ./Commands/ 폴더 안에 있는 내용을 불러와서 작업하기
 * readdir = read the contents of a directory
 * sync = Synchronous API → The synchronous APIs perform all operations "synchronously",
 * blocking the event loop until the operation completes or fails.
 * (즉, 이름 그대로 작업을 동기적으로 처리함.)
 * (참고: https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options)
 */
fs.readdirSync('./Commands/').forEach(dir => {
  // Filter라는 변수를 선언하고, Commands 폴더 내의 .js로 끝나는 파일들만 필터링한 배열을 할당합니다.
  const Filter = fs.readdirSync(`./Commands/${dir}`).filter(f => f.endsWith('.js'));
  /**
   * String.prototype.endsWith()
   * 어떤 문자열이 특정 문자열로 끝나는지를 확인한 뒤 boolean 값을 반환합니다.
   */

  console.log(Filter);
  /**
   * [ 'embed.js', 'help.js', 'pong.js', 'team.js', 'webhook.js' ]
   * [ 'ban.js', 'clean.js', 'kick.js' ]
   */

  Filter.forEach(file => {
    const cmd = require(`./Commands/${dir}/${file}`);

    client.commands.set(cmd.config.name, cmd);
    /**
     * set()은 Map 객체의 프로토타입 메서드로서,
     * 첫 번째 인자로는 추가/변경할 요소의 key를 전달하고
     * 두 번째 인자로는 해당 key의 value가 될 것을 전달합니다.
     */

    for (let alias of cmd.config.aliases) {
      // for...of문은 순회 가능한 자료 구조(이터러블)를 순회합니다.
      client.aliases.set(alias, cmd.config.name);
    }
  });
});

// 명령어를 실행할 때 사용할 함수
function runCommand(command, message, args, prefix) {
  const cmd = client.commands.get(command)
    ? client.commands.get(command)
    : client.commands.get(client.aliases.get(command));
    /**
     * get()은 Map 객체의 프로토타입 메서드로서,
     * 인자로 전달한 key에 해당하는 value를 반환합니다.
     * (해당하는 값이 없을 경우 undefined 반환)
     */

    if (cmd) cmd.run(client, message, args, prefix);
    /**
     * 만약 입력한 값에 대응하는 명령어가 존재한다면, 해당 명령어를 실행시킵니다.
     * run() → This methods runs a function synchronously within a context
     * and return its return value.
     */
    return;
}

client.on('message', async msg => {
  if (msg.author.bot) return;

  const prefix = '!';

  if (!msg.content.startsWith(prefix)) return;
  /**
   * String.prototype.startsWith()
   * 어떤 문자열이 특정 문자로 시작하는지를 확인한 뒤 boolean 값을 반환합니다.
   */
  
  let args = msg.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  try {
    runCommand(command, msg, args, prefix);
  } catch (err) { // 명령어 실행 도중 에러가 발생할 경우 에러 메시지 출력
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
