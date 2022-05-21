// 참조 아이디에 대한, 유니크 한 id 리스트

export const getIdByUniq = (str?: string) => {
  const idList = str
    ? str
        .split(' ')
        .filter((id) => id.includes('@'))
        .map((id) => Number(id.replaceAll('@', '')))
        .filter((id) => !isNaN(id))
    : [];

  const uniqArr = idList.filter((item, idx) => idList.indexOf(item) === idx);

  return uniqArr;
};
