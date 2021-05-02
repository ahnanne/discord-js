/**
 * @param {array} members 전체 명단을 배열로 전달
 * @param {number} number 한 팀당 팀원 수를 숫자(정수)로 전달
 * @returns 팀 구성 결과를 배열로 반환
 */

function makeTeam(members = [], number = 1) {

  // 각 멤버에게 임의의 key 값을 부여
  const generateRandomKey = () => Math.floor(Math.random() * 1000);

  const membersWithKey = members.map(member => ({
    name: member,
    key: generateRandomKey(),
  }));

  // 각 멤버를 key 값의 크기에 따라 오름차순으로 정렬
  const sortResult = membersWithKey.sort((a, b) => {
    return a.key >= b.key ? 1 : -1;
  });

  // 정렬 결과에서 임의로 부여했던 key 프로퍼티를 제거
  sortResult.forEach(res => delete res.key);

  // number parameter로 전달했던 팀원 수에 맞게 팀 나누기
  const teamResult = [];

  for (let i = 0; i < members.length; i++) {
    const piece = [...sortResult].slice(i, i + number);
    teamResult.push(piece);

    i += number - 1;
  }

  return teamResult;
}

/* -------------------------------- test case ------------------------------- */
console.log(makeTeam(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], 3));

/**
[
  [ { name: 'g' }, { name: 'h' }, { name: 'b' } ], // 1팀
  [ { name: 'd' }, { name: 'c' }, { name: 'e' } ], // 2팀
  [ { name: 'f' }, { name: 'a' } ] // 3팀
]
 */
