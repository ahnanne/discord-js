exports.run = async (client, msg, args, prefix) => {
  msg.reply(`${client.ws.ping}ms`); // 웹소켓(websocket) 지연 시간을 알려주기
}

exports.config = {
  name: '핑',
  aliases: ['vld', 'ping'],
  category: ['bot'],
  des: ['봇의 디스코드 웹소켓 지연시간을 알려드립니다'],
  use: ['!핑']
}