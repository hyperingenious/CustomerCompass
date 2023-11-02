export function create300Square(rawFromServer) {
  const len = rawFromServer.length;
  let sq = [];

  if (len >= 304) {
    rawFromServer.slice(-304).forEach((el) => sq.unshift(el.rating));
    return sq;
  }

  if (len === 0) {
    sq = Array.from({ length: 304 }, () => 0);
    return sq;
  }

  if (len < 304) {
    const difference = 304 - len;

    Array.from({ length: difference }, () => 0).forEach((el) => sq.push(el));
    rawFromServer.forEach((el) => sq.unshift(el.rating));

    return sq;
  }
}