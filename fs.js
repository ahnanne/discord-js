const fs = require('fs');

const text = 'fs 모듈 사용법';

fs.writeFile('example.txt', text, 'utf-8', err => {
  if (err) console.error(err);

  console.log('파일 저장 완료!');
});
