import { initializeStarStorageArray } from "../../helpers/helper";

export function starPieDataForLast7Days(rawFromServer) {
  const date7DaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  const filterDataAsPerDate = rawFromServer.filter(
    (data) => new Date(data.created_at) >= date7DaysAgo
  );

  const finalPieData7Days = initializeStarStorageArray();
  filterDataAsPerDate.reduce((acc, current) => {
    acc[current.rating - 1].value += current.rating;
    return acc;
  }, finalPieData7Days);

  return finalPieData7Days;
}

export function starPieDataForLast30Days(rawFromServer) {
  const date30DaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  const filterDataAsPerDate = rawFromServer.filter(
    (data) => new Date(data.created_at) >= date30DaysAgo
  );
  const finalPieData30Days = initializeStarStorageArray();
  filterDataAsPerDate.reduce((acc, current) => {
    acc[current.rating - 1].value += 1;
    return acc;
  }, finalPieData30Days);
  return finalPieData30Days;
}

/**
 * @param {Array} rawFromServer rating data received from the server
 * @returns an array of objects which contains all the star data for all the time
 *   @example
 *  [
 *   { name: '1 Star', value: 0 },
 *   { name: '2 Star', value: 0 },
 *   { name: '3 Star', value: 0 },
 *   { name: '4 Star', value: 0 },
 *   { name: '5 Star', value: 0 }
 *  ]
 */
export function starPieDataForLastAllDays(rawFromServer) {
  const finalPieDataAllTime = initializeStarStorageArray();
  for (let i = 0; i < rawFromServer.length; i++) {
    finalPieDataAllTime[rawFromServer[i].rating - 1].value += 1;
  }
  return finalPieDataAllTime;
}
