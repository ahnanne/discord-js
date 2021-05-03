const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    const hook = new Discord.WebhookClient(
        process.env.WEBHOOK_ID,
        process.env.WEBHOOK_TOKEN
    );
      // 첫 번째 인자로는 앞서 만들었던 웹훅 ID를 전달해주시고,
      // 두 번째 인자로는 웹훅 토큰을 전달해주세요. (토큰의 경우 보안에 주의하세요!!)

    hook.send('Hello, new world!');
      // 지정되어있는 채널에 웹훅이 이 내용을 보내줍니다.
}

exports.config = {
    name: '웹훅',
    aliases: ['vld', 'botping'],
    category: ['bot'],
    des: ['웹훅에 대한 사용방법'],
    use: ['!웹훅']
}